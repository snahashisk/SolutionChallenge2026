"use client";
import { MdOutlineOpenInNew } from "react-icons/md";

import { useId, useMemo, useState } from "react";

import { SearchIcon } from "lucide-react";

import type {
  Column,
  ColumnDef,
  ColumnFiltersState,
  RowData,
  SortingState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import axios from "axios";
import axiosInstance from "@/lib/axios";

import { useIsMobile } from "@/hooks/use-mobile";
import { useRouter } from "next/navigation";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Dialog13 from "../dialog/dialog-13";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { cn } from "@/lib/utils";
import Maps from "@/components/Maps";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: "text" | "range" | "select";
  }
}

type Item = {
  id: string;
  title: string;
  category: string;
  imageOfReport: string;
  description: string;
  stepsToResolve: string;
  address: string;
  urgencyLevel: string;
  affectedPeople: number;
  createdAt: string;
  status: string;
};

const DataTableWithColumnFilterDemo = (props: {
  data: any[];
  status: string;
}) => {
  const router = useRouter();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "createdAt",
      desc: true,
    },
  ]);

  const columns: ColumnDef<Item>[] = [
    {
      id: "select",
      header: () => null,
      cell: ({ row }: { row: any }) => (
        <MdOutlineOpenInNew
          className="text-base cursor-pointer"
          onClick={() => {
            router.push(`/dashboard/reportdetail/${row.original._id}`);
          }}
        />
      ),
    },
    {
      header: "Title",
      accessorKey: "title",
      cell: ({ row }) => {
        return (
          <TableCellViewer item={row.original} sectionStatus={props.status} />
        );
      },
    },
    {
      header: "Address",
      accessorKey: "address",
      cell: ({ row }) => <div>{row.getValue("address")}</div>,
      // enableSorting: false,
      // meta: {
      //   filterVariant: "range",
      // },
    },
    {
      header: "Urgency Level",
      accessorKey: "urgencyLevel",
      cell: ({ row }) => {
        const urgencyLevel = row.getValue("urgencyLevel") as string;

        const styles = {
          High: "bg-yellow-600/10 text-yellow-600 focus-visible:ring-yellow-600/20 dark:bg-yellow-400/10 dark:text-yellow-400 dark:focus-visible:ring-yellow-400/40 [a&]:hover:bg-yellow-600/5 dark:[a&]:hover:bg-yellow-400/5",
          Low: "bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5",
          Medium:
            "bg-blue-600/10 text-blue-600 focus-visible:ring-blue-600/20 dark:bg-blue-400/10 dark:text-blue-400 dark:focus-visible:ring-blue-400/40 [a&]:hover:bg-blue-600/5 dark:[a&]:hover:bg-blue-400/5",
          Critical:
            "bg-red-600/10 text-red-600 focus-visible:ring-red-600/20 dark:bg-red-400/10 dark:text-red-400 dark:focus-visible:ring-red-400/40 [a&]:hover:bg-red-600/5 dark:[a&]:hover:bg-red-400/5",
          "Not specified":
            "bg-gray-600/10 text-gray-600 focus-visible:ring-gray-600/20 dark:bg-gray-400/10 dark:text-gray-400 dark:focus-visible:ring-gray-400/40 [a&]:hover:bg-gray-600/5 dark:[a&]:hover:bg-gray-400/5",
        }[urgencyLevel];

        return (
          <Badge
            className={(cn("border-none focus-visible:outline-none"), styles)}
          >
            {row.getValue("urgencyLevel")}
          </Badge>
        );
      },
      enableSorting: false,
      meta: {
        filterVariant: "select",
      },
    },
    {
      header: "Category",
      accessorKey: "category",
      cell: ({ row }) => <div>{row.getValue("category")}</div>,
    },
    {
      header: "Affected People",
      accessorKey: "affectedPeople",
      cell: ({ row }) => <div>{row.getValue("affectedPeople")}</div>,
      meta: {
        filterVariant: "range",
      },
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
      cell: ({ row }) => {
        const date = row.getValue("createdAt") as string;

        return (
          <div>
            {new Date(date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </div>
        );
      },
      sortingFn: (rowA, rowB) => {
        return (
          new Date(rowA.original.createdAt).getTime() -
          new Date(rowB.original.createdAt).getTime()
        );
      },
    },
    {
      header: "Reported By",
      accessorKey: "reporterName",
      cell: ({ row }) => <div>{row.getValue("reporterName")}</div>,
    },
  ];

  const table = useReactTable({
    data: props.data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
  });

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <div className="flex flex-wrap gap-2 justify-between px-6 py-4">
          <div className="flex flex-col gap-1">
            {props.status === "pending" && (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold">
                    Cases Awaiting Verification
                  </span>
                  <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
                    Verification Pending
                  </Badge>
                </div>
                <span className="text-muted-foreground text-sm">
                  Here you can verify and take action on new cases
                </span>
              </>
            )}

            {props.status === "verified" && (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold">
                    Cases Needing Volunteers
                  </span>

                  <Badge className="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                    Waiting for Volunteers
                  </Badge>
                </div>
                <span className="text-muted-foreground text-sm">
                  These cases are verified and waiting for volunteers
                </span>
              </>
            )}

            {props.status === "inprogress" && (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold">Ongoing Cases</span>
                  <Badge className="bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300">
                    Ongoing
                  </Badge>
                </div>
                <span className="text-muted-foreground text-sm">
                  These cases are currently being handled by volunteers
                </span>
              </>
            )}

            {props.status === "joined" && (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold">
                    My Assigned Cases
                  </span>
                  <Badge className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                    Assigned
                  </Badge>
                </div>
                <span className="text-muted-foreground text-sm">
                  Cases you have joined and are responsible for.
                </span>
              </>
            )}

            {props.status === "resolved" && (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold">Resolved Cases</span>
                  <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                    Resolved
                  </Badge>
                </div>
                <span className="text-muted-foreground text-sm">
                  Cases that have been resolved.
                </span>
              </>
            )}
          </div>
          <div className="flex gap-1">
            <div className="w-44 lg:w-56">
              <Filter column={table.getColumn("title")!} />
            </div>
            <div className="w-36 lg:w-56">
              <Filter column={table.getColumn("urgencyLevel")!} />
            </div>
          </div>
        </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted/50">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="relative h-10 border-t select-none pl-6"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="pl-6 h-10">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* <p className="text-muted-foreground mt-4 text-center text-sm">Data table with column filter</p> */}
    </div>
  );
};

function Filter({ column }: { column: Column<any, unknown> }) {
  const id = useId();
  const columnFilterValue = column.getFilterValue();
  const { filterVariant } = column.columnDef.meta ?? {};
  const columnHeader =
    typeof column.columnDef.header === "string" ? column.columnDef.header : "";

  const facetedUniqueValues = column.getFacetedUniqueValues();

  const sortedUniqueValues = useMemo(() => {
    if (filterVariant === "range") return [];

    const values = Array.from(facetedUniqueValues.keys());

    const flattenedValues = values.reduce((acc: string[], curr) => {
      if (Array.isArray(curr)) {
        return [...acc, ...curr];
      }

      return [...acc, curr];
    }, []);

    return Array.from(new Set(flattenedValues)).sort();
  }, [facetedUniqueValues, filterVariant]);

  if (filterVariant === "range") {
    return (
      <div className="*:not-first:mt-2">
        <Label>{columnHeader}</Label>
        <div className="flex">
          <Input
            id={`${id}-range-1`}
            className="flex-1 rounded-r-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            value={(columnFilterValue as [number, number])?.[0] ?? ""}
            onChange={(e) =>
              column.setFilterValue((old: [number, number]) => [
                e.target.value ? Number(e.target.value) : undefined,
                old?.[1],
              ])
            }
            placeholder="Min"
            type="number"
            aria-label={`${columnHeader} min`}
          />
          <Input
            id={`${id}-range-2`}
            className="-ms-px flex-1 rounded-l-none [-moz-appearance:_textfield] focus:z-10 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            value={(columnFilterValue as [number, number])?.[1] ?? ""}
            onChange={(e) =>
              column.setFilterValue((old: [number, number]) => [
                old?.[0],
                e.target.value ? Number(e.target.value) : undefined,
              ])
            }
            placeholder="Max"
            type="number"
            aria-label={`${columnHeader} max`}
          />
        </div>
      </div>
    );
  }

  if (filterVariant === "select") {
    return (
      <div className="*:not-first:mt-2">
        <Label htmlFor={`${id}-select`}>{columnHeader}</Label>
        <Select
          value={columnFilterValue?.toString() ?? "all"}
          onValueChange={(value) => {
            column.setFilterValue(value === "all" ? undefined : value);
          }}
        >
          <SelectTrigger id={`${id}-select`} className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {sortedUniqueValues.map((value) => (
              <SelectItem key={String(value)} value={String(value)}>
                {String(value)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <div className="*:not-first:mt-2">
      <Label htmlFor={`${id}-input`}>{columnHeader}</Label>
      <div className="relative">
        <Input
          id={`${id}-input`}
          className="peer pl-9"
          value={(columnFilterValue ?? "") as string}
          onChange={(e) => column.setFilterValue(e.target.value)}
          placeholder={`Search ${columnHeader.toLowerCase()}`}
          type="text"
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50">
          <SearchIcon size={16} />
        </div>
      </div>
    </div>
  );
}

export default DataTableWithColumnFilterDemo;

function TableCellViewer({
  item,
  sectionStatus,
}: {
  item: any;
  sectionStatus: string;
}) {
  const isMobile = useIsMobile();

  const handleApprove = async () => {
    try {
      await axiosInstance.post(
        "/api/v1/report/vote",
        {
          reportId: item._id,
          type: "positive",
        },
        { withCredentials: true },
      );

      toast.success("Positive vote added successfully!");
    } catch (error: any) {
      const message = error?.response?.data?.message || "Something went wrong";

      toast.error(message);
    }
  };

  const handleReject = async () => {
    try {
      await axiosInstance.post(
        "/api/v1/report/vote",
        {
          reportId: item._id,
          type: "negative",
        },
        { withCredentials: true },
      );

      toast.success("Negative vote added successfully!");
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };

  const handleJoin = async () => {
    try {
      await axiosInstance.post(
        "/api/v1/report/join",
        {
          reportId: item._id,
        },
        { withCredentials: true },
      );
      toast.success("Successfully joined the report!");
    } catch (error: any) {
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };

  const router = useRouter();
  const handleOpenChat = () => {
    router.push(`/dashboard/reportdetail/${item._id}/teamchat`);
  };

  return (
    <Drawer direction={isMobile ? "right" : "right"}>
      <DrawerTrigger asChild>
        <Button
          variant="link"
          className="w-fit px-0 text-left text-foreground cursor-pointer"
        >
          {item.title}
        </Button>
      </DrawerTrigger>

      <DrawerContent className="overflow-y-auto overflow-x-hidden">
        <DrawerHeader>
          <DrawerTitle>{item.title}</DrawerTitle>
          <DrawerDescription>
            {item.category}{" "}
            {sectionStatus == "joined" && (
              <Badge
                variant="default"
                className="ml-2 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
              >
                {item.status}
              </Badge>
            )}
            {sectionStatus == "pending" && (
              <Badge
                variant="default"
                className="ml-2 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
              >
                {item.status}
              </Badge>
            )}
            {sectionStatus == "inprogress" && (
              <Badge
                variant="default"
                className="ml-2 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
              >
                {item.status}
              </Badge>
            )}
            {sectionStatus == "verified" && (
              <Badge
                variant="default"
                className=" bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
              >
                {item.status}
              </Badge>
            )}
          </DrawerDescription>
        </DrawerHeader>

        <div className="flex flex-col gap-4 px-4 text-sm">
          <div className="mx-auto">
            <img
              src={item.imageOfReport}
              alt=""
              className=" object-cover rounded-md"
            />
          </div>
          <div>
            <strong>Description:</strong>
            <p>{item.description}</p>
          </div>
          {sectionStatus !== "pending" && (
            <div>
              <strong>Steps to Resolve:</strong>
              <p>{item.stepsToResolve}</p>
            </div>
          )}

          <div>
            <strong>Address:</strong>
            <p>{item.address}</p>
            <p>
              {item.locality},{item.city},{item.state}-{item.pinCode}
            </p>
            <p>LandMark: {item.landmark}</p>
          </div>
          <div>
            <Maps lat={item?.location?.lat} lng={item?.location?.lng} />
          </div>
          <Separator />
          <div>
            <strong>Urgency:</strong>
            <p>{item.urgencyLevel}</p>
          </div>

          <div>
            <strong>Affected People:</strong>
            <p>{item.affectedPeople}</p>
          </div>
          <Separator />
          <div>
            <strong>Reported By:</strong>
            <p>{item.reporterName}</p>
          </div>
          <div>
            <strong>Created At:</strong>
            <p>{new Date(item.createdAt).toLocaleString()}</p>
          </div>
          <Separator />
          {sectionStatus == "verified" && (
            <div className="flex flex-col gap-1">
              <div>
                <strong>Responsibility of Captain:</strong>
                <p>
                  Lead volunteers, manage tasks, and ensure the case is
                  completed.
                </p>
              </div>
              <div>
                <strong>Responsibility of Volunteer:</strong>
                <p>
                  Help volunteers, coordinate with authorities, and ensure the
                  case is resolved efficiently.
                </p>
              </div>
            </div>
          )}
        </div>

        <DrawerFooter>
          {sectionStatus === "pending" && (
            <>
              <Button
                variant="default"
                className="text-white cursor-pointer"
                onClick={handleApprove}
              >
                Approve
              </Button>
              <Button
                variant="destructive"
                className="cursor-pointer"
                onClick={handleReject}
              >
                Reject
              </Button>
            </>
          )}

          {sectionStatus === "verified" && (
            <>
              <Button variant="default" className=" cursor-pointer">
                Join as Captain
              </Button>
              <Button
                variant="secondary"
                className=" cursor-pointer"
                onClick={handleJoin}
              >
                Join as Volunteer
              </Button>
            </>
          )}

          {sectionStatus === "inprogress" && (
            <>
              <Button
                variant="default"
                className=" cursor-pointer"
                onClick={handleJoin}
              >
                Join as Volunteer
              </Button>
            </>
          )}

          {sectionStatus === "joined" && (
            <>
              <Dialog13 data={item} />
              <Button
                variant="secondary"
                className=" cursor-pointer"
                onClick={handleOpenChat}
              >
                Open Team Chat
              </Button>
            </>
          )}

          <DrawerClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
