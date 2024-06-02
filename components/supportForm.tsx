// components/SupportForm.js
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Input, Textarea, Button } from "@nextui-org/react";

const SupportForm = () => {
  const { handleSubmit, control, reset } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-5xl w-96 mx-auto p-8 shadow-lg rounded-lg"
    >
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div className="mb-6">
            <Input
              {...field}
              fullWidth
              label="Name"
              placeholder="Enter your name"
              className="w-full"
            />
          </div>
        )}
      />
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div className="mb-6">
            <Input
              {...field}
              fullWidth
              label="Email"
              placeholder="Enter your email"
              type="email"
              className="w-full"
            />
          </div>
        )}
      />
      <Controller
        name="subject"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div className="mb-6">
            <Input
              {...field}
              fullWidth
              label="Subject"
              placeholder="Enter the subject"
              className="w-full"
            />
          </div>
        )}
      />
      <Controller
        name="message"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div className="mb-6">
            <Textarea
              {...field}
              fullWidth
              label="Message"
              placeholder="Describe your issue or query"
              className="w-full"
            />
          </div>
        )}
      />
      <Button type="submit" className="w-full bg-blue-500 text-white py-3">
        Submit
      </Button>
    </form>
  );
};

export default SupportForm;
