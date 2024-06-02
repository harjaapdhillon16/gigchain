import React from "react";
import { Card, CardBody, Chip } from "@nextui-org/react";

const GigItem = ({ gig }: any) => {
  return (
    <Card
      shadow="sm"
      className="w-full hover:scale-105 transition-all"
      key={gig.id}
      isPressable
      onPress={() => console.log(`Item pressed: ${gig.title}`)}
    >
      <CardBody className="relative p-4">
        <div className="absolute bottom-2 opacity-40 right-2 text-xs">
          Posted {gig.timeline}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="block font-bold text-xl mb-2">{gig.name}</p>
            <div className="flex space-x-2 items-center">
              {gig.tags.map((tag: any, tagIndex: number) => (
                <Chip key={tagIndex} variant="faded" color="primary">
                  {tag}
                </Chip>
              ))}
            </div>
          </div>
          <Chip color="primary">{gig.budget}</Chip>
        </div>
      </CardBody>
    </Card>
  );
};

export default GigItem;
