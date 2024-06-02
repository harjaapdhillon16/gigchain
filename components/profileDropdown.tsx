import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Image,
} from "@nextui-org/react";
import Link from "next/link";
import { useUser } from "@/utils/authUser";

import { GigFormModal } from "./createGig";
import { useRouter } from "next/router";

function ProfileDropdown() {
  const [visible, setVisible] = useState(false);
  const { address, supabaseUser: userDetails } = useUser();
  const { push } = useRouter();

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Image
            className="rounded-full object-fill "
            width="30"
            radius="full"
            isZoomed
            height="30"
            alt=""
            src={
              userDetails?.profile_image ??
              "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
            }
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem
            onClick={() => {
              push("/profile");
            }}
            key="new"
          >
            <Link href="/profile">Profile</Link>
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              setVisible(true);
            }}
            key="new"
          >
            <p>Create Gig</p>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <GigFormModal {...{ visible, setVisible }} />
    </>
  );
}

export { ProfileDropdown };
