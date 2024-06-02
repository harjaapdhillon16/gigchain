import React from "react";
import { Avatar, Card, Spacer, CardBody } from "@nextui-org/react";

const gigApplicationsData = [
  {
    id: 1,
    username: "JohnDoe",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    comment:
      "I am highly experienced in e-commerce website development and would love to work on your project. I have over 5 years of experience in building responsive, user-friendly websites that are optimized for both desktop and mobile devices. My expertise includes using the latest technologies like React, Node.js, and MongoDB. I also have experience in integrating payment gateways and developing custom features to enhance the user experience. Additionally, I focus on writing clean, maintainable code and following best practices to ensure the website is scalable and secure. I believe my skills and experience make me a great fit for your project, and I am eager to contribute to its success. Let's discuss how I can help you achieve your business goals.",
    posted: "2 hours ago",
  },
  {
    id: 2,
    username: "JaneSmith",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    comment:
      "As a startup branding specialist, I can create a unique and memorable logo for your business. With over 4 years of experience in graphic design and branding, I have helped numerous startups establish their brand identities. My design process starts with understanding your vision, values, and target audience. I then create multiple logo concepts and refine them based on your feedback. I also ensure that the logo is versatile and works well across different media, from digital to print. In addition to the logo, I can provide a complete brand identity package that includes color schemes, typography, and visual guidelines. My goal is to create a cohesive and professional brand presence that sets you apart from the competition. I look forward to collaborating with you on this exciting project.",
    posted: "1 day ago",
  },
  {
    id: 3,
    username: "MikeJohnson",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    comment:
      "With my expertise in content writing, I can provide engaging and SEO-optimized articles for your blog. I have been a professional writer for over 6 years, specializing in creating high-quality content that drives traffic and engages readers. My writing process involves thorough research to understand the topic and target audience, followed by crafting well-structured and informative articles. I also incorporate SEO best practices, including keyword optimization and internal linking, to improve search engine rankings. Additionally, I am experienced in writing in various styles and formats, from blog posts and how-to guides to thought leadership articles. I am passionate about delivering content that not only informs but also inspires and resonates with readers. Let's work together to create compelling content for your blog.",
    posted: "3 days ago",
  },
  {
    id: 4,
    username: "EmilyDavis",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    comment:
      "I have extensive experience in SEO optimization and can help improve your website's search engine ranking. With over 5 years of experience in digital marketing, I have a deep understanding of SEO strategies and techniques. My approach includes conducting comprehensive keyword research, optimizing on-page elements like meta tags and headings, and building high-quality backlinks. I also focus on improving the overall user experience, as it plays a crucial role in search engine rankings. Additionally, I use advanced analytics tools to monitor performance and make data-driven adjustments. My goal is to achieve sustainable, long-term growth in organic search traffic and drive more qualified leads to your business. I am excited about the opportunity to enhance your online presence and contribute to your success.",
    posted: "1 week ago",
  },
];

const GigApplications = () => {
  return (
    <div className="space-y-2">
      {gigApplicationsData.map((comment) => (
        <div key={comment.id}>
          <Card shadow="sm">
            <CardBody>
              <div className="flex items-start">
                <div className="w-[50px]">
                  <Avatar src={comment.avatar} size="md" />
                </div>
                <div className="ml-2">
                  <p className="font-bold">{comment.username}</p>
                  <p className="text-sm" color="gray">
                    {comment.posted}
                  </p>
                  <Spacer y={0.5} />
                  <p>{comment.comment}</p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default GigApplications;
