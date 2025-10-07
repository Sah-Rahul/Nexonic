import React from "react";
import Layout from "./Layout";
import { useLocation } from "react-router-dom";
import { formatBreadcrumb } from "../lib/breadcrumb";

const HomeAppliances = () => {
  const location = useLocation();
 

  return (
    <>
      <Layout>
        <div className="min-h-screen bg-orange-500 mt-5 w-[94%] p-4">
          <h1 className="text-2xl font-bold text-white">
            {formatBreadcrumb(location.pathname)}
          </h1>
        </div>
      </Layout>
    </>
  );
};

export default HomeAppliances;
