// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { transporter, mailOptions } from "@/pages/config/nodemailer"

type Data = {
  message: string,
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  if(req.method === "POST"){
    const data = req.body;
    if(!data.name || !data.email || !data.message){
      return res.status(400).json({ message: 'Bad Request' })
    }
    try {
      await transporter.sendMail({
        ...mailOptions,
        subject: "New Recipent",
        text: "This is test text",
        html: `
        <h1>New Message</h1>
        <p>Name: ${data.name}</p>
        <p>Email: ${data.email}</p>
        <p>Message: ${data.message}</p>`
      });
      return res.status(200).json({ message: "true" })
    } catch (err) {
      return res.status(400).json({ message: "Error" })
    }
  }
  return res.status(400).json({ message: 'Bad Request' })
}

export default handler;