import { instance } from "@/constants/apis/instance"

export const dynamic = 'force-static'
 
export async function POST(req: Request) {
  const res = await instance.post("/user_profile/login/",req.body)
  return Response.json(res.data)
}