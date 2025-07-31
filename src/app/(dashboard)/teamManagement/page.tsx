// "use client";

// import { useState, useEffect } from "react";
// import Modal from "@/components/Modal/modal";
// import DeleteModal from "@/components/Modal/deleteModal";
// import Container from "@/components/ui/container";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Pencil, Trash2 } from "lucide-react";
// import { Switch } from "@/components/ui/switch";
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from "@/components/ui/table";
// import { CardContent } from "@/components/ui/card";
// import PageTitle from "@/components/ui/pageTitle";
// import { EmployeeFormValidation } from "@/components/employeeformvalidation/EmployeeFormValidation";
// import { useAppContext } from "@/hooks/context";
// import Alert from "@/components/alert/alert";
// import { useAlert } from "@/hooks/alertHook";

// type Employee = {
//   id: number;
//   memberId: string;
//   name: string;
//   email: string;
//   password: string;
//   role: string;
//   joinDate: string;
//   status: "Active" | "Inactive";
// };

// export default function TeamManagementPage() {
//   const [employees, setEmployees] = useState<Employee[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
//   const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null);
//   const [employeeToToggle, setEmployeeToToggle] = useState<number | null>(null);
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const { URL } = useAppContext();
//   const { alert, showAlert, hideAlert } = useAlert();

//   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiOWYzOGE2NS1mNGVlLTQ5MjktOGZjYy04ZGM0YzNmM2Q5M2IiLCJ1c2VybmFtZSI6InN1bmFwYW5hQGdtYWlsLmNvbSIsInJvbGVzIjpbImFkbWluIl0sImFjY2Vzc190eXBlIjoiRVhURVJOQUwiLCJleHAiOjE3NTI2NTkzMTh9.e3FGOfvLeWZ0wO-Bd8fiAHUwr-PgIfLZhuaDG3ufqzQ";

//   useEffect(() => {
//     const fetchTeamData = async () => {
//       try {
//         const response = await fetch(`${URL}/teams`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//             memberId: "fb07aeac-7d62-4a8b-aa20-5aa3af03717c", // set appropriately
//           },
//         });

//         if (!response.ok) throw new Error("Failed to fetch team data");

//         const data = await response.json();
//         const transformed = data.map((member: any, index: number) => ({
//           id: index + 1,
//           memberId: member.memberId,
//           name: member.memberName,
//           email: member.memberEmail,
//           password: "",
//           role: member.role,
//           joinDate: member.createdAt?.split("T")[0] || new Date().toISOString().split("T")[0],
//           status: member.status || "Active",
//         }));

//         setEmployees(transformed);
//       } catch (err) {
//         console.error(err);
//         showAlert("Failed to fetch team data", "error");
//       }
//     };

//     fetchTeamData();
//   }, []);

//   const handleAddEmployee = async (data: {
//     name: string;
//     email: string;
//     password: string;
//     role: string;
//   }) => {
//     setIsSubmitting(true);
//     try {
//       const isUpdate = editingId !== null;
//       const existingEmp = employees.find((e) => e.id === editingId);
//       const memberId = isUpdate ? existingEmp?.memberId : "";

//       const employeeData = {
//         memberName: data.name,
//         memberEmail: data.email,
//         memberPassword: data.password,
//         orgId: "1234567890",
//         role: data.role.toLowerCase(),
//         memberId,
//         memberStatus: "Active",
//       };

//       const endpoint = isUpdate
//         ? `${URL}/update-team/${memberId}`
//         : `${URL}/create-team`;

//       const response = await fetch(endpoint, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           memberId,
//         },
//         body: JSON.stringify(employeeData),
//       });

//       if (!response.ok) throw new Error("Failed to save employee");

//       const result = await response.json();
//       const today = new Date().toISOString().split("T")[0];

//       if (isUpdate) {
//         setEmployees((prev) =>
//           prev.map((emp) =>
//             emp.id === editingId
//               ? {
//                   ...emp,
//                   name: data.name,
//                   email: data.email,
//                   role: data.role,
//                 }
//               : emp
//           )
//         );
//         showAlert("Employee updated successfully", "success");
//       } else {
//         const newEmp: Employee = {
//           id: Date.now(),
//           memberId: result.memberId,
//           name: data.name,
//           email: data.email,
//           password: "",
//           role: data.role,
//           joinDate: today,
//           status: "Active",
//         };
//         setEmployees((prev) => [...prev, newEmp]);
//         showAlert("Employee added successfully", "success");
//       }

//       setEditingId(null);
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error(error);
//       showAlert("Failed to save employee", "error");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleEdit = (employee: Employee) => {
//     setEditingId(employee.id);
//     setIsModalOpen(true);
//   };

//   const handleDeleteClick = (employee: Employee) => {
//     setEmployeeToDelete(employee.id);
//     setIsDeleteModalOpen(true);
//   };

//   const handleDeleteConfirm = async () => {
//     if (!employeeToDelete) return;

//     try {
//       const employee = employees.find((e) => e.id === employeeToDelete);
//       if (!employee) return;

//       const response = await fetch(`${URL}/delete-team/${employee.memberId}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//           memberId: employee.memberId,
//         },
//       });

//       if (!response.ok) throw new Error("Delete failed");

//       setEmployees((prev) => prev.filter((e) => e.id !== employeeToDelete));
//       showAlert("Employee deleted", "success");
//     } catch (error) {
//       console.error(error);
//       showAlert("Delete failed", "error");
//     } finally {
//       setIsDeleteModalOpen(false);
//       setEmployeeToDelete(null);
//     }
//   };

//   const handleStatusToggleClick = (id: number) => {
//     setEmployeeToToggle(id);
//     setIsStatusModalOpen(true);
//   };

//   const handleStatusToggleConfirm = () => {
//     if (employeeToToggle) {
//       setEmployees((prev) =>
//         prev.map((emp) =>
//           emp.id === employeeToToggle
//             ? {
//                 ...emp,
//                 status: emp.status === "Active" ? "Inactive" : "Active",
//               }
//             : emp
//         )
//       );
//     }
//     setIsStatusModalOpen(false);
//     setEmployeeToToggle(null);
//   };

//   return (
//     <Container>
//       <div className="flex items-center justify-between">
//         <PageTitle title="Team Management" description="Manage team members" />
//         <Button
//           onClick={() => {
//             setEditingId(null);
//             setIsModalOpen(true);
//           }}
//         >
//           Add Employee
//         </Button>
//       </div>

//       <CardContent className="pt-4">
//         <Modal
//           open={isModalOpen}
//           onClose={() => {
//             setIsModalOpen(false);
//             setEditingId(null);
//           }}
//           title={editingId ? "Edit Employee" : "Add Employee"}
//         >
//           <EmployeeFormValidation
//             defaultValues={
//               editingId
//                 ? employees.find((emp) => emp.id === editingId)
//                 : undefined
//             }
//             onSubmit={handleAddEmployee}
//             onCancel={() => {
//               setIsModalOpen(false);
//               setEditingId(null);
//             }}
//             isSubmitting={isSubmitting}
//             isEdit={!!editingId}
//           />
//         </Modal>

//         <DeleteModal
//           open={isDeleteModalOpen}
//           onClose={() => setIsDeleteModalOpen(false)}
//           onConfirm={handleDeleteConfirm}
//           variant="delete"
//         />

//         <Modal
//           open={isStatusModalOpen}
//           onClose={() => setIsStatusModalOpen(false)}
//           title="Change Status"
//         >
//           <div className="text-center py-4">
//             <p className="mb-4">
//               Change status of{" "}
//               <strong>
//                 {
//                   employees.find((e) => e.id === employeeToToggle)?.name ||
//                   "this user"
//                 }
//               </strong>
//               ?
//             </p>
//             <div className="flex justify-center gap-4">
//               <Button onClick={() => setIsStatusModalOpen(false)}>Cancel</Button>
//               <Button onClick={handleStatusToggleConfirm}>Confirm</Button>
//             </div>
//           </div>
//         </Modal>

//         <div className="rounded-md border">
//           <Table>
//             <TableHeader className="bg-gray-100">
//               <TableRow>
//                 <TableHead className="text-center">S.No</TableHead>
//                 <TableHead className="text-center">Name</TableHead>
//                 <TableHead className="text-center">Email</TableHead>
//                 <TableHead className="text-center">Role</TableHead>
//                 <TableHead className="text-center">Join Date</TableHead>
//                 <TableHead className="text-center">Status</TableHead>
//                 <TableHead className="text-center">Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {employees.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={7} className="text-center h-24">
//                     No records found.
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 employees.map((emp, i) => (
//                   <TableRow key={emp.id}>
//                     <TableCell className="text-center">{i + 1}</TableCell>
//                     <TableCell className="text-center">{emp.name}</TableCell>
//                     <TableCell className="text-center">{emp.email}</TableCell>
//                     <TableCell className="text-center">{emp.role}</TableCell>
//                     <TableCell className="text-center">{emp.joinDate}</TableCell>
//                     <TableCell className="text-center">
//                       <div className="flex items-center justify-center gap-2">
//                         <Switch
//                           checked={emp.status === "Active"}
//                           onCheckedChange={() => handleStatusToggleClick(emp.id)}
//                           className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
//                         />
//                         <Badge
//                           variant={emp.status === "Active" ? "default" : "secondary"}
//                         >
//                           {emp.status}
//                         </Badge>
//                       </div>
//                     </TableCell>
//                     <TableCell className="text-center">
//                       <div className="flex justify-center gap-2">
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => handleEdit(emp)}
//                         >
//                           <Pencil className="h-4 w-4" />
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => handleDeleteClick(emp)}
//                           className="text-red-600"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </div>
//       </CardContent>
//       {alert && <Alert alert={alert} hideAlert={hideAlert} />}
//     </Container>
//   );
// }

"use client";

import { useState } from "react";
import Modal from "@/components/Modal/modal";
import DeleteModal from "@/components/Modal/deleteModal";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { CardContent } from "@/components/ui/card";
import PageTitle from "@/components/ui/pageTitle";
import { EmployeeFormValidation } from "@/components/employeeformvalidation/EmployeeFormValidation";
import Alert from "@/components/alert/alert";
import { useAlert } from "@/hooks/alertHook";

type Employee = {
  id: number;
  memberId: string;
  name: string;
  email: string;
  password: string;
  role: string;
  joinDate: string;
  status: "Active" | "Inactive";
};

// Static employee data
const initialEmployees: Employee[] = [
  {
    id: 1,
    memberId: "fb07aeac-7d62-4a8b-aa20-5aa3af03717c",
    name: "Saravanan M",
    email: "john.doe@example.com",
    password: "",
    role: "Admin",
    joinDate: "2023-01-15",
    status: "Active",
  },
  // {
  //   id: 2,
  //   memberId: "a1b2c3d4-e5f6-7g8h-9i10-j11k12l13m14",
  //   name: "Kesavan",
  //   email: "jane.smith@example.com",
  //   password: "",
  //   role: "Manager",
  //   joinDate: "2023-02-20",
  //   status: "Active",
  // },
  // {
  //   id: 3,
  //   memberId: "n15o16p17-q18r19-s20t21-u22v23w24x25",
  //   name: "Abishek",
  //   email: "Abishek.j@example.com",
  //   password: "",
  //   role: "Developer",
  //   joinDate: "2023-03-10",
  //   status: "Active",
  // },
  {
    id: 4,
    memberId: "y26z27a28-b29c30-d31e32-f33g34h35i36",
    name: "Kavi",
    email: "kavi.d@example.com",
    password: "",
    role: "Lead",
    joinDate: "2023-04-05",
    status: "Inactive",
  },
  {
    id: 5,
    memberId: "j37k38l39-m40n41-o42p43-q44r45s46t47",
    name: "Antony",
    email: "antony.w@example.com",
    password: "",
    role: "Support",
    joinDate: "2023-05-12",
    status: "Active",
  },
];

export default function TeamManagementPage() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null);
  const [employeeToToggle, setEmployeeToToggle] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { alert, showAlert, hideAlert } = useAlert();

  const handleAddEmployee = async (data: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    setIsSubmitting(true);
    try {
      const isUpdate = editingId !== null;
      
      if (isUpdate) {
        setEmployees((prev) =>
          prev.map((emp) =>
            emp.id === editingId
              ? {
                  ...emp,
                  name: data.name,
                  email: data.email,
                  role: data.role,
                }
              : emp
          )
        );
        showAlert("Employee updated successfully", "success");
      } else {
        const newEmp: Employee = {
          id: employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1,
          memberId: `emp-${Date.now()}`,
          name: data.name,
          email: data.email,
          password: "",
          role: data.role,
          joinDate: new Date().toISOString().split("T")[0],
          status: "Active",
        };
        setEmployees((prev) => [...prev, newEmp]);
        showAlert("Employee added successfully", "success");
      }

      setEditingId(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      showAlert("Failed to save employee", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (employee: Employee) => {
    setEditingId(employee.id);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (employee: Employee) => {
    setEmployeeToDelete(employee.id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!employeeToDelete) return;

    try {
      setEmployees((prev) => prev.filter((e) => e.id !== employeeToDelete));
      showAlert("Employee deleted", "success");
    } catch (error) {
      console.error(error);
      showAlert("Delete failed", "error");
    } finally {
      setIsDeleteModalOpen(false);
      setEmployeeToDelete(null);
    }
  };

  const handleStatusToggleClick = (id: number) => {
    setEmployeeToToggle(id);
    setIsStatusModalOpen(true);
  };

  const handleStatusToggleConfirm = () => {
    if (employeeToToggle) {
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === employeeToToggle
            ? {
                ...emp,
                status: emp.status === "Active" ? "Inactive" : "Active",
              }
            : emp
        )
      );
    }
    setIsStatusModalOpen(false);
    setEmployeeToToggle(null);
  };

  return (
    <Container>
      <div className="flex items-center justify-between">
        <PageTitle title="Team Management" description="Manage team members" />
        <Button
          onClick={() => {
            setEditingId(null);
            setIsModalOpen(true);
          }}
        >
          Add Employee
        </Button>
      </div>

      <CardContent className="pt-4">
        <Modal
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingId(null);
          }}
          title={editingId ? "Edit Employee" : "Add Employee"}
        >
          <EmployeeFormValidation
            defaultValues={
              editingId
                ? employees.find((emp) => emp.id === editingId)
                : undefined
            }
            onSubmit={handleAddEmployee}
            onCancel={() => {
              setIsModalOpen(false);
              setEditingId(null);
            }}
            isSubmitting={isSubmitting}
            isEdit={!!editingId}
          />
        </Modal>

        <DeleteModal
          open={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          variant="delete"
        />

        <Modal
          open={isStatusModalOpen}
          onClose={() => setIsStatusModalOpen(false)}
        >
          <div className="p-6 min-w-[400px] max-w-md">
          {/* Icon and Header in same line */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Confirm Status Change
            </h3>
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <p className="text-gray-600 leading-relaxed">
              Are you sure you want to change the status of{" "}
              <span className="font-semibold text-gray-900">
                {employees.find((e) => e.id === employeeToToggle)?.name || "this user"}
              </span>
              ?
            </p>
          </div>
        </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              onClick={() => setIsStatusModalOpen(false)}
              className="flex-1 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleStatusToggleConfirm}
              className="flex-1 bg-amber-600 text-white hover:bg-amber-700 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
            >
              Confirm Change
            </Button>
          </div>
        
      </Modal>

        <div className="rounded-md border">
          <Table>
            <TableHeader className="bg-gray-100">
              <TableRow>
                <TableHead className="text-center">S.No</TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Email</TableHead>
                <TableHead className="text-center">Role</TableHead>
                <TableHead className="text-center">Join Date</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center h-24">
                    No records found.
                  </TableCell>
                </TableRow>
              ) : (
                employees.map((emp, i) => (
                  <TableRow key={emp.id}>
                    <TableCell className="text-center">{i + 1}</TableCell>
                    <TableCell className="text-center">{emp.name}</TableCell>
                    <TableCell className="text-center">{emp.email}</TableCell>
                    <TableCell className="text-center">{emp.role}</TableCell>
                    <TableCell className="text-center">{emp.joinDate}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Switch
                          checked={emp.status === "Active"}
                          onCheckedChange={() => handleStatusToggleClick(emp.id)}
                          className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-red-500"
                        />
                        <Badge
                          variant={emp.status === "Active" ? "default" : "secondary"}
                        >
                          {emp.status}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(emp)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(emp)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        
        
      </CardContent>
      {alert && <Alert alert={alert} hideAlert={hideAlert} />}
    </Container>
  );
}