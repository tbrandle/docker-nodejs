import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const main = async () => {
  // const resume = await prisma.resume.create({ data: { 
  //   resume_title: "",
  //   personal_details: "",
  //   social_media: "",
  //   skills: "",
  //   employment_history: "",
  //   education: "",
  //   personalDetailsId: 0
  //  }})
  //  console.log({resume})

  //  const user = await prisma.user.create({ data: { name: "Tim" }})
  //  console.log({user})

  const resume = await prisma.resume.create({ 
    data: {
      resume_title: "Tim",
      personal_details: {
        create: {
          first_name: "Tim",
          last_name: "Brandle",
          job_title: "Senior Software Developer",
          professional_summary:
            "<p>Senior Full Stack Software Developer who specializes in React.js, with experience in Java and Node.js.</p>",
          phone_number: "720-281-6350",
          email: "tbrandle53@gmail.com",
          fields: {
            createMany: {
              data: [
                {
                  "label": "first_name",
                  "type": "text",
                  "value": "Tim",
                },
                {
                  "label": "last_name",
                  "type": "text",
                  "value": "Brandle",
                },
                {
                  "label": "job_title",
                  "type": "text",
                  "value": "Senior Software Developer",
                },
                {
                  "label": "professional_summary",
                  "type": "html",
                  "value":
                    "<p>Senior Full Stack Software Developer who specializes in React.js, with experience in Java and Node.js.</p>",
                },
                {
                  "label": "phone_number",
                  "type": "phone",
                  "value": "720-281-6350",
                },
                {
                  "label": "email",
                  "type": "email",
                  "value": "tbrandle53@gmail.com",
                },
              ],
            },
          }
        },
      },
      "social_media": "Tim",
      "skills": "Tim",
      "employment_history": "Tim",
      "education": "Tim",
    },
    include:{
      personal_details: {
        include: {
          fields: true
        }
      }
    }
  })
   console.log(resume.personal_details.fields)


}

main()
  .catch(e => {
      console.error(e.message)
  })
  .finally(async () => {
      await prisma.$disconnect()
  })