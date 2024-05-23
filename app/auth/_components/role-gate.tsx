"use client";

import FormError from "@/components/form-error";
import { useRole } from "@/hooks/use-role";
import { UserRole } from "@prisma/client";


interface RoleGateProps {
    children: React.ReactNode;
    allowedRole: UserRole;
}

export const RoleGate = ({
    children, allowedRole
}: RoleGateProps) => {

    const role = useRole();

    if(role !== allowedRole) {
        return <FormError message="You are not permitted to view this content" />
    }

    return <>{children}</>
}