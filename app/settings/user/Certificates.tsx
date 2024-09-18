import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";

const Certificates = () => {
  // Mock data - in a real application, this would come from a backend or state management
  const certificates = [
    { id: 1, name: "Introduction to React", issuer: "CSI", date: "2024-03-15", status: "verified", downloadUrl: "#", verifyUrl: "#" },
    { id: 2, name: "Advanced JavaScript", issuer: "CSI", date: "2024-02-10", status: "pending", downloadUrl: "#", verifyUrl: "#" },
    { id: 3, name: "UI/UX Design Fundamentals", issuer: "CodeAdda", date: "2024-01-20", status: "verified", downloadUrl: "#", verifyUrl: "#" },
    { id: 4, name: "Data Structures and Algorithms", issuer: "ECO", date: "2023-12-05", status: "verified", downloadUrl: "#", verifyUrl: "#" },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Certificates</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <Card key={cert.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>{cert.name}</span>
                <Badge 
                  variant={cert.status === "verified" ? "default" : "secondary"}
                >
                  {cert.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-2">Issued by: {cert.issuer}</p>
              <p className="text-sm text-gray-500 mb-4">Date: {new Date(cert.date).toLocaleDateString()}</p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <a href={cert.downloadUrl} download>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Preview
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Certificates;