"use client";

import { useState } from "react";
import { Home, Plus, FileText, Users, Settings, BarChart3, Wrench, Building, AlertTriangle } from "lucide-react";

// Helper function for className conditionals
const cn = (...classes: any[]) => classes.filter(Boolean).join(" ");

interface SidebarProps {
  userRole: "faculty" | "staff" | "admin";
}

export function Sidebar({ userRole }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const facultyMenuItems = [
    { icon: Home, label: "Dashboard", href: "/faculty/dashboard" },
    { icon: Plus, label: "New Request", href: "/faculty/new-request" },
    { icon: FileText, label: "My Requests", href: "/faculty/requests" },
    { icon: Settings, label: "Settings", href: "/faculty/settings" },
  ];

  const staffMenuItems = [
    { icon: Home, label: "Dashboard", href: "/staff/dashboard" },
    { icon: Wrench, label: "My Tasks", href: "/staff/tasks" },
    { icon: AlertTriangle, label: "Urgent Tasks", href: "/staff/urgent" },
    { icon: Settings, label: "Settings", href: "/staff/settings" },
  ];

  const adminMenuItems = [
    { icon: Home, label: "Dashboard", href: "/admin/dashboard" },
    { icon: FileText, label: "All Requests", href: "/admin/requests" },
    { icon: Users, label: "Staff Management", href: "/admin/staff" },
    { icon: Building, label: "Locations", href: "/admin/locations" },
    { icon: BarChart3, label: "Reports", href: "/admin/reports" },
    { icon: Settings, label: "Settings", href: "/admin/settings" },
  ];

  const getMenuItems = () => {
    switch (userRole) {
      case "faculty":
        return facultyMenuItems;
      case "staff":
        return staffMenuItems;
      case "admin":
        return adminMenuItems;
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div
      className={cn(
        "d-flex flex-column h-100 bg-white border-end",
        collapsed ? "w-auto" : ""
      )}
      style={{ 
        minHeight: "100vh",
        width: collapsed ? "60px" : "250px",
        transition: "width 0.3s"
      }}
    >
      <div className="d-flex align-items-center justify-content-between p-3 border-bottom">
        {!collapsed && (
          <div className="d-flex align-items-center">
            <Wrench className="text-primary" style={{ width: "32px", height: "32px" }} />
            <span className="fs-4 fw-bold ms-2">EduFix</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="btn btn-light btn-sm"
          style={{ padding: "0.375rem" }}
        >
          <svg
            className={`${collapsed ? "rotate-180" : ""}`}
            style={{ 
              height: "16px", 
              width: "16px",
              transition: "transform 0.3s" 
            }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="flex-grow-1 overflow-auto">
        <nav className="p-3">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "d-flex align-items-center text-decoration-none py-2 px-3 rounded mb-2",
                collapsed ? "justify-content-center px-2" : "justify-content-start",
                hoveredItem === item.href ? "bg-light text-primary" : "text-dark"
              )}
              style={{ transition: "background-color 0.2s" }}
              onMouseEnter={() => setHoveredItem(item.href)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <item.icon style={{ width: "16px", height: "16px" }} />
              {!collapsed && <span className="ms-2">{item.label}</span>}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
