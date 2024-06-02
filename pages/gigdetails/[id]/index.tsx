import DefaultLayout from "@/layouts/default";
import { Button, Chip, Divider, Link, User } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import GigList from "@/components/giglist/list";
import GigApplications from "@/components/gigdetails/gigApplications";
import { ApplyModal } from "./applyModal";

export default function GigDetailsPage() {
  const id = useParams();
  const { back } = useRouter();
  const frontend = {
    id: 5,
    title: "Data Analysis for Market Research",
    posted: "5 days ago",
    tags: ["Data Analysis", "Excel", "Statistics"],
    price: "$400",
    description: `Data-driven insights are key to making informed business decisions and staying ahead of the competition. Our data analysis service for market research provides you with comprehensive, actionable insights into market trends, customer behavior, and competitive landscape. We use advanced data collection and analysis techniques to gather and interpret data from various sources, ensuring a holistic understanding of your market. Our team of analysts specializes in statistical analysis, predictive modeling, and data visualization to uncover patterns and trends that can inform your business strategy.

    Whether you need to assess market opportunities, evaluate customer preferences, or optimize your marketing efforts, our data analysis service delivers the insights you need to make strategic decisions with confidence. We present our findings in clear, easy-to-understand reports, complete with visual aids and recommendations. By leveraging our expertise, you can turn data into a powerful tool for driving growth and achieving your business objectives.`,
  };
  return (
    <DefaultLayout>
      <Divider className="mb-2" />
      <div className="flex items-center translate-x-[-26px] space-x-2">
        <button
          onClick={() => {
            back();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>
        <p className="text-2xl font-bold">{frontend.title}</p>
      </div>
      <div className="flex space-x-2 mt-3 items-center">
        {frontend.tags.map((tag: any, tagIndex: number) => (
          <Chip key={tagIndex} variant="solid" color="primary">
            {tag}
          </Chip>
        ))}
      </div>
      <p className="whitespace-pre-line mt-5 mb-4">{frontend.description}</p>
      <div className="flex items-center justify-between">
        <p className="text-xl">
          Gig Budget : <span className="font-bold">{frontend.price}</span>
        </p>
        <ApplyModal />
      </div>
      <p className="text-sm mb-1">Gig Posted by</p>
      <User
        name="Junior Garcia"
        description={
          <Link href="https://twitter.com/jrgarciadev" size="sm" isExternal>
            @jrgarciadev
          </Link>
        }
        className="pl-2 pr-4 py-2"
        avatarProps={{
          src: "https://avatars.githubusercontent.com/u/30373425?v=4",
        }}
      />
      <div className="flex w-full mt-3 flex-col">
        <Tabs>
          <Tab key="photos" title="Gig Applications">
            <Card>
              <CardBody>
                <GigApplications />
              </CardBody>
            </Card>
          </Tab>
          <Tab key="videos" title="Other Gigs Posted by User">
            <Card className="overflow-visible">
              <CardBody className="overflow-visible">
                <GigList />
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </DefaultLayout>
  );
}
