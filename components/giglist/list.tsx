import React, { useEffect, useState } from "react";
import { Card, CardBody, Divider } from "@nextui-org/react";
import GigItem from "./listItem";
import Search from "./search";
import CheckTags from "./checkTags";
import axios from "axios";

const gigData = [
  {
    id: 1,
    title: "Website Development for E-commerce Store",
    posted: "2 days ago",
    tags: ["Development", "Marketing", "Coding"],
    price: "$1000",
  },
  {
    id: 2,
    title: "Logo and Brand Design for Startup",
    posted: "3 days ago",
    tags: ["Design", "UX/UI", "Branding"],
    price: "$500",
  },
  {
    id: 3,
    title: "Content Writing for Blog",
    posted: "1 day ago",
    tags: ["Writing", "Editing", "Proofreading"],
    price: "$150",
  },
  {
    id: 4,
    title: "SEO Optimization for Website",
    posted: "4 days ago",
    tags: ["SEO", "Content Marketing", "Blogging"],
    price: "$300",
  },
  {
    id: 5,
    title: "Data Analysis for Market Research",
    posted: "5 days ago",
    tags: ["Data Analysis", "Excel", "Statistics"],
    price: "$400",
  },
];

const GigList = () => {
  const [allGigs, setAllGigs] = useState([]);

  useEffect(() => {
    (async () => {
      const {
        data: { data },
      } = await axios.post("/api/supabase/select", {
        table: "gigs",
      });
      setAllGigs(data);
    })();
  }, []);

  return (
    <>
      <div className="flex items-center">
        <Search />
        <CheckTags />
      </div>
      <Divider className="my-2" />
      <div className="space-y-2 mb-5">
        {allGigs.map((gig:any, index) => (
          <GigItem gig={gig} key={gig.id} />
        ))}
      </div>
    </>
  );
};

export default GigList;
