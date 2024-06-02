// @ts-nocheck
// components/GigFormModal.js
import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ModalContent,
  Checkbox,
  Spinner,
} from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { useUser } from "@/utils/authUser";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/router";

const GigFormModal = ({ visible, setVisible }: any) => {
  const [formLoading, setFormLoading] = useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => setVisible(false);
  const { push } = useRouter();

  const { handleSubmit, control, reset, formState: { errors } } = useForm();
  const { supabaseUser } = useUser();

  const onSubmit = async (data: any) => {
    const { id } = supabaseUser ?? {};
    setFormLoading(true);
    try {
      await axios.post("/api/supabase/insert", {
        table: "gigs",
        body: {
          posted_by_user: id,
          description: data.gigDescription,
          name: data.gigName,
          budget: data.gigPrice,
          timeline: data.timeline,
          deadline: data.lastDate,
          tags: data.tags,
        },
      });
      toast.success("Gig Created Successfully");
      push("/profile");
      closeHandler();
      reset();
    } catch (error) {
      toast.error("Error creating gig");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        isOpen={visible}
        size="4xl"
        onOpenChange={closeHandler}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <h3 className="text-2xl" id="modal-title">
                  Create a New Gig
                </h3>
              </ModalHeader>
              <ModalBody className="p-4">
                <form
                  className="space-y-3 mb-4"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Controller
                    name="gigName"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Gig Name is required" }}
                    render={({ field }) => (
                      <div>
                        <Input
                          {...field}
                          fullWidth
                          label="Gig Name"
                          placeholder="Enter the gig name"
                          status={errors.gigName ? "error" : "default"}
                        />
                        {errors.gigName && (
                          <p className="text-red-500">{errors.gigName.message}</p>
                        )}
                      </div>
                    )}
                  />
                  <Controller
                    name="gigPrice"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Gig Price is required" }}
                    render={({ field }) => (
                      <div>
                        <Input
                          {...field}
                          fullWidth
                          label="Gig Price (in USD)"
                          placeholder="Enter the gig price"
                          type="number"
                          status={errors.gigPrice ? "error" : "default"}
                        />
                        {errors.gigPrice && (
                          <p className="text-red-500">{errors.gigPrice.message}</p>
                        )}
                      </div>
                    )}
                  />
                  <Controller
                    name="gigDescription"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Gig Description is required" }}
                    render={({ field }) => (
                      <div>
                        <Textarea
                          {...field}
                          fullWidth
                          label="Gig Description"
                          placeholder="Enter the gig description"
                          status={errors.gigDescription ? "error" : "default"}
                        />
                        {errors.gigDescription && (
                          <p className="text-red-500">{errors.gigDescription.message}</p>
                        )}
                      </div>
                    )}
                  />
                  <Controller
                    name="timeline"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Timeline is required" }}
                    render={({ field }) => (
                      <div>
                        <Input
                          {...field}
                          fullWidth
                          label="Timeline"
                          placeholder="Enter the timeline for the gig"
                          status={errors.timeline ? "error" : "default"}
                        />
                        {errors.timeline && (
                          <p className="text-red-500">{errors.timeline.message}</p>
                        )}
                      </div>
                    )}
                  />
                  <Popover>
                    <PopoverTrigger>
                      <Controller
                        name="lastDate"
                        control={control}
                        defaultValue=""
                        rules={{ required: "Last Date of Submission is required" }}
                        render={({ field }) => (
                          <div>
                            <Input
                              {...field}
                              fullWidth
                              type="date"
                              label="Last Date of Submission"
                              placeholder="Select the last date"
                              status={errors.lastDate ? "error" : "default"}
                            />
                            {errors.lastDate && (
                              <p className="text-red-500">{errors.lastDate.message}</p>
                            )}
                          </div>
                        )}
                      />
                    </PopoverTrigger>
                    <PopoverContent>
                      <div>
                        <p>Date Picker Component</p>
                      </div>
                    </PopoverContent>
                  </Popover>
                  <Controller
                    name="tags"
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                      <div className="space-y-2">
                        <label className="block font-medium ">
                          Related Tags
                        </label>
                        <div className="flex flex-wrap gap-2">
                          <Checkbox
                            {...field}
                            value="Development"
                            isSelected={field.value.includes("Development")}
                            onChange={(e) => {
                              const value = e.target.checked
                                ? [...field.value, e.target.value]
                                : field.value.filter(
                                    (v: string) => v !== e.target.value
                                  );
                              field.onChange(value);
                            }}
                          >
                            Development
                          </Checkbox>
                          <Checkbox
                            {...field}
                            value="Marketing"
                            isSelected={field.value.includes("Marketing")}
                            onChange={(e) => {
                              const value = e.target.checked
                                ? [...field.value, e.target.value]
                                : field.value.filter(
                                    (v: string) => v !== e.target.value
                                  );
                              field.onChange(value);
                            }}
                          >
                            Marketing
                          </Checkbox>
                          <Checkbox
                            {...field}
                            value="Product Development"
                            isSelected={field.value.includes(
                              "Product Development"
                            )}
                            onChange={(e) => {
                              const value = e.target.checked
                                ? [...field.value, e.target.value]
                                : field.value.filter(
                                    (v: string) => v !== e.target.value
                                  );
                              field.onChange(value);
                            }}
                          >
                            Product Development
                          </Checkbox>
                          <Checkbox
                            {...field}
                            value="Web3"
                            isSelected={field.value.includes("Web3")}
                            onChange={(e) => {
                              const value = e.target.checked
                                ? [...field.value, e.target.value]
                                : field.value.filter(
                                    (v: string) => v !== e.target.value
                                  );
                              field.onChange(value);
                            }}
                          >
                            Web3
                          </Checkbox>
                          <Checkbox
                            {...field}
                            value="Blogging"
                            isSelected={field.value.includes("Blogging")}
                            onChange={(e) => {
                              const value = e.target.checked
                                ? [...field.value, e.target.value]
                                : field.value.filter(
                                    (v: string) => v !== e.target.value
                                  );
                              field.onChange(value);
                            }}
                          >
                            Blogging
                          </Checkbox>
                        </div>
                      </div>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full mt-2"
                    color="primary"
                    disabled={formLoading}
                  >
                    {formLoading ? <Spinner color="white" /> : "Submit"}
                  </Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export { GigFormModal };
