/* eslint-disable @next/next/no-img-element */
import DefaultLayout from "@/layouts/default";
import {
  Divider,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { Github, X } from "lucide-react";
import GigList from "@/components/giglist/list";
import { useUser } from "@/utils/authUser";

export default function GigDetailsPage() {
  const { address, supabaseUser: userDetails } = useUser();

  return (
    <DefaultLayout>
      <Divider className="mb-2" />
      <img
        className="rounded-lg h-[300px] w-full object-cover	"
        alt=""
        src="https://images.unsplash.com/photo-1666979663156-a8b9f5aaa433?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <div className="translate-y-[-25px] px-4">
        <div className="text-center ">
          <div className="mx-auto w-[fit-content]">
            <Image
              src={
                userDetails?.profile_image ??
                "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
              }
              className="rounded-full w-[60px] h-[60px] object-fit"
              alt=""
              radius="full"
              isZoomed
            />
          </div>
          <div className="px-2 mt-2">
            <p className="text-xl font-bold">{userDetails?.name}</p>
          </div>
        </div>
        <p className="mt-3 text-base text-center font-regular">
          {userDetails?.bio}
        </p>
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="col-span-3">
            <Tabs>
              <Tab key="posted" title="Gigs Completed">
                <Card className="overflow-visible">
                  <CardBody className="overflow-visible">
                    <GigList />
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="completed" title="Gigs Completed">
                <Card className="overflow-visible">
                  <CardBody className="overflow-visible">
                    <GigList />
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>
          </div>
          <div className="col-span-1">
            <Card className="max-w-[340px]">
              <CardHeader className="justify-between">
                <p className="text-md">Socials</p>
              </CardHeader>
              <CardBody className="px-3 pb-4 pt-0 text-small text-default-400">
                <div className="flex space-x-1">
                  <button className="">
                    <Github />
                  </button>
                  <button className="">
                    <X />
                  </button>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}
