"use client";
import Blog from "@/components/shadcn-studio/blocks/blog-component-15/blog-component-15";
import { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "@/lib/axios";

const Events = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const response = await axiosInstance.get("api/v1/report/sixMostRecentReports");
      setReports(response.data.data);
    };
    fetchReports();
  }, []);
  return (
    <section id="events" className="scroll-mt-16">
      <Blog report={reports} />
    </section>
  );
};

export default Events;
