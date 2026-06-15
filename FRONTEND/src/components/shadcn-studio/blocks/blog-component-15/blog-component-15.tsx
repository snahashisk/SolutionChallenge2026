"use client";
import { SearchIcon, ArrowRightIcon, CalendarDaysIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type BlogPost = {
  title: string;
  description: string;
  imageOfReport: string;
  imageAlt: string;
  date: string;
  category: string;
  author: string;
  authorLink: string;
  blogLink: string;
  categoryLink: string;
};

type ReportTypes = {
  title: string;
  description: string;
  imageOfReport: string;
  imageAlt: string;
  date: string;
  category: string;
  author: string;
  authorLink: string;
  blogLink: string;
  categoryLink: string;
  createdAt: string;
};

type BlogProps = {
  blogPosts: BlogPost[];
};

type ReportProps = {
  report: ReportTypes[];
};

const BlogGrid = ({ posts }: { posts: ReportTypes[] }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, index) => (
        <Card key={index} className="group h-full overflow-hidden shadow-none transition-all duration-300">
          <CardContent className="space-y-3.5">
            <div className="mb-6 overflow-hidden rounded-lg sm:mb-12">
              <a href={post.blogLink}>
                <img
                  src={post.imageOfReport}
                  alt={post.imageAlt}
                  className="h-59.5 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </a>
            </div>
            <div className="flex items-center justify-between gap-1.5">
              <div className="text-muted-foreground flex items-center gap-1.5">
                <CalendarDaysIcon className="size-6" />
                <span>
                  {post.createdAt &&
                    new Date(post.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                </span>
              </div>
              <a href={post.categoryLink}>
                <Badge className="bg-primary/10 text-primary rounded-full border-0 text-sm">{post.category}</Badge>
              </a>
            </div>
            <h3 className="line-clamp-2 text-lg font-medium md:text-xl">
              <a href={post.blogLink}>{post.title}</a>
            </h3>
            <p className="text-muted-foreground line-clamp-2">{post.description}</p>
            <div className="flex items-center justify-between">
              <a href={post.authorLink} className="text-sm font-medium">
                {post.author}
              </a>
              <Button
                size="icon"
                variant="outline"
                className="group-hover:bg-primary! group-hover:text-primary-foreground group-hover:border-primary hover:border-primary hover:bg-primary! hover:text-primary-foreground"
                asChild
              >
                <a href={post.blogLink}>
                  <ArrowRightIcon className="size-4 -rotate-45" />
                  <span className="sr-only">Read more: {post.title}</span>
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const Blog = ({ report }: ReportProps) => {
  //get all the unique categories
  const categories = [
    "All",
    ...new Set(
      report.map((item) => {
        return item.category;
      }),
    ),
  ];

  return (
    <section className="py-8 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:space-y-16 lg:px-8">
        {/* Header */}
        <div className="space-y-4 text-center">
          <h2 className="text-2xl font-semibold md:text-3xl lg:text-4xl">Our Initiatives</h2>

          <p className="text-muted-foreground text-lg md:text-xl">
            Discover how we’re making a difference in the lives of those who need it most. Through our various programs
            and projects, we strive to bring hope, support, and positive change to communities everywhere.
          </p>
        </div>

        {/* Tabs and Search */}
        <Tabs defaultValue="All" className="gap-8 lg:gap-16">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <ScrollArea className="bg-muted w-full rounded-lg sm:w-auto">
              <TabsList className="gap-1 group-data-[orientation=horizontal]/tabs:h-auto">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="hover:bg-primary/10 cursor-pointer rounded-lg px-4 text-base group-data-[orientation=horizontal]/tabs:after:h-0"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>

            <div className="relative max-md:w-full">
              <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
                <SearchIcon className="size-4" />
                <span className="sr-only">Search</span>
              </div>
              <Input
                type="search"
                placeholder="Search"
                className="peer h-10 px-9 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none [&::-webkit-search-results-button]:appearance-none [&::-webkit-search-results-decoration]:appearance-none"
              />
            </div>
          </div>

          {/* All Posts Tab */}
          <TabsContent value="All">
            <BlogGrid posts={report} />
          </TabsContent>

          {/* Category-specific Tabs */}
          {categories.slice(1).map((category, index) => (
            <TabsContent key={index} value={category}>
              <BlogGrid posts={report.filter((post) => post.category === category)} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Blog;
