import type { IncomingMessage, ServerResponse } from 'node:http'
import { loadEnv, type Plugin } from 'vite'
import nodemailer from 'nodemailer'

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (chunk) => {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
    })
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

function json(res: ServerResponse, status: number, payload: object) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

export function mailPlugin(mode: string): Plugin {
  const env = loadEnv(mode, process.cwd(), '')
  const user = env.MAIL_USER?.trim() ?? ''
  const pass = (env.MAIL_PASS ?? '').replaceAll(' ', '')
  const to = (env.MAIL_TO?.trim() || user)

  return {
    name: 'bashi-mail',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0]
        if (url !== '/api/send-message') {
          next()
          return
        }

        if (req.method !== 'POST') {
          json(res, 405, { ok: false, error: 'Method not allowed' })
          return
        }

        try {
          const body = JSON.parse(await readBody(req)) as {
            message?: string
            date?: string
            answers?: {
              prompt?: string
              code?: string
              herAnswer?: string
              correctAnswer?: string
            }[]
          }
          const message = body.message?.trim() ?? ''
          if (!message) {
            json(res, 400, { ok: false, error: 'Message is required' })
            return
          }

          if (!user || user.includes('your-gmail') || !pass) {
            json(res, 500, {
              ok: false,
              error: 'Mail is not configured',
            })
            return
          }

          const quizBlock = (body.answers ?? [])
            .map((item, i) =>
              [
                `Q${i + 1}: ${item.prompt ?? ''}`,
                item.code ? `Code:\n${item.code}` : '',
                `She chose: ${item.herAnswer ?? ''}`,
              ]
                .filter(Boolean)
                .join('\n'),
            )
            .join('\n\n')

          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user, pass },
          })

          await transporter.sendMail({
            from: `Date With Bashi <${user}>`,
            to,
            subject: 'Bashi replied',
            text: `I love you, Bashi.

--- Quiz answers ---
${quizBlock || 'No quiz answers'}

--- Date ---
${body.date?.trim() || 'Not chosen'}

--- Her message ---
${message}`,
          })

          json(res, 200, { ok: true })
        } catch (error) {
          const detail = error instanceof Error ? error.message : 'Send failed'
          json(res, 500, { ok: false, error: detail })
        }
      })
    },
  }
}
