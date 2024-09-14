import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const EventPageSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Cover Image Skeleton */}
      <Skeleton className="w-full h-[600px] rounded-lg mb-8" />

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column - Event Details Skeleton */}
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-1/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardHeader>
              <Skeleton className="h-8 w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Registration and Stats Skeleton */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-2/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-full mb-4" />
              <Skeleton className="h-4 w-1/2 mx-auto" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-2/3" />
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                {[...Array(5)].map((_, index) => (
                  <Skeleton key={index} className="h-10 w-10 rounded-full" />
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex space-x-4">
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-10 w-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPageSkeleton;