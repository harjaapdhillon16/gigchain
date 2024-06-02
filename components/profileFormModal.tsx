import React, { useState, ChangeEvent } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Image,
  ModalContent,
  Spinner,
} from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";
import { useUser } from "../utils/authUser";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/router";

interface FormInputs {
  profilePicture?: File;
  name: string;
  bio: string;
  email: string;
  twitterHandle?: string;
  telegramHandle?: string;
  websiteLink?: string;
}

export const ProfileFormModal: React.FC<{ visible: boolean }> = ({
  visible,
}) => {
  const { push } = useRouter();
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>();
  const [loading, setLoading] = useState(false);

  const { address, isNear } = useUser();

  const handleProfilePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setValue("profilePicture", e?.target?.files?.[0] ?? undefined);
    if (file) {
      setProfilePicture(file);
    }
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setLoading(true);
    console.log(data);
    const {
      data: { data: supabase_data },
    } = await axios.post("/api/supabase/insert", {
      table: "users",
      body: {
        wallet: address,
        bio: data.bio,
        wallet_chain: isNear ? "near" : "ethereum",
        name: data.name,
        email: data.email,
        social: {
          twitter: data.twitterHandle,
          telegram: data.telegramHandle,
          website: data.websiteLink,
        },
      },
    });
    if (data?.profilePicture) {
      const [{ id }] = supabase_data;
      await supabase.storage
        .from("profile-images")
        .upload(`${id}.png`, profilePicture ?? "", {
          cacheControl: "3600",
          upsert: true,
        });
      await axios.post("/api/supabase/update", {
        table: "users",
        body: {
          profile_image: `https://brsoxxuzugtzxcugxjvo.supabase.co/storage/v1/object/public/profile-images/${id}.png`,
        },
        match: {
          wallet: address,
        },
      });
    }
    toast.success("Welcome to GigChain !");
    setLoading(false);
    push("/profile");
  };

  return (
    <>
      <Modal isOpen={visible} onOpenChange={() => {}}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader>
                <h3 className="text-md">
                  Please complete your profile <br /> in order to use GigChain
                </h3>
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label htmlFor="profilePicture" className="text-sm">
                      Profile Picture
                    </label>
                    <input
                      type="file"
                      id="profilePicture"
                      accept="image/*"
                      {...register("profilePicture")}
                      onChange={handleProfilePictureChange}
                      className="block w-full mt-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {profilePicture && (
                      <div style={{ marginTop: "10px" }}>
                        <Image
                          src={URL.createObjectURL(profilePicture)}
                          alt="Profile Preview"
                          width={100}
                          height={100}
                        />
                      </div>
                    )}
                  </div>

                  <div style={{ marginTop: "10px" }}>
                    <Input
                      id="name"
                      label="Name *"
                      {...register("name", { required: true })}
                      fullWidth
                    />
                    {errors.name && (
                      <span className="text-xs text-red-500 translate-x-2">
                        Name is required
                      </span>
                    )}
                  </div>

                  <div style={{ marginTop: "10px" }}>
                    <Textarea
                      id="bio"
                      label="Bio *"
                      {...register("bio", { required: true })}
                      fullWidth
                    />
                    {errors.bio && (
                      <span className="text-xs text-red-500 translate-x-2">
                        Bio is required
                      </span>
                    )}
                  </div>

                  <div style={{ marginTop: "10px" }}>
                    <Input
                      id="email"
                      type="email"
                      label="Email *"
                      {...register("email", {
                        required: true,
                        pattern: /^\S+@\S+$/i,
                      })}
                      fullWidth
                    />
                    {errors.email && (
                      <span className="text-xs text-red-500 translate-x-2">
                        Valid email is required
                      </span>
                    )}
                  </div>

                  <div style={{ marginTop: "10px" }}>
                    <Input
                      id="twitterHandle"
                      label="Twitter Handle"
                      {...register("twitterHandle")}
                      fullWidth
                    />
                  </div>

                  <div style={{ marginTop: "10px" }}>
                    <Input
                      id="telegramHandle"
                      label="Telegram Handle"
                      {...register("telegramHandle")}
                      fullWidth
                    />
                  </div>

                  <div style={{ marginTop: "10px" }}>
                    <Input
                      id="websiteLink"
                      label="Website Link"
                      type="url"
                      {...register("websiteLink")}
                      fullWidth
                    />
                  </div>

                  <Button
                    color="primary"
                    type="submit"
                    style={{ marginTop: "20px", width: "100%" }}
                  >
                    {loading ? <Spinner color="white" /> : "Submit"}
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
