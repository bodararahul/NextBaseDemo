'use client';

import * as React from 'react';
// team member roles = ['admin', 'member', 'owner']
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Enum } from '@/types';
import { Label } from '@/components/ui/Label';

type DefaultValueProp = {
  defaultValue: Enum<'organization_member_role'>;
};

type ValueProp = {
  value: Enum<'organization_member_role'>;
};

type OtherProps = DefaultValueProp | ValueProp;

type TeamMemberRoleSelectProps = {
  onChange: (value: Enum<'organization_member_role'>) => void;
} & OtherProps;

// typeguard to narrow string to Enum<'organization_member_role'>
function isTeamMemberRole(
  value: string,
): value is Enum<'organization_member_role'> {
  return ['admin', 'member', 'readonly'].includes(value);
}

export function OrganizationMemberRoleSelect({
  onChange,
  ...restProps
}: TeamMemberRoleSelectProps) {
  return (
    <Select
      {...restProps}
      onValueChange={(value) => {
        if (!isTeamMemberRole(value)) {
          throw new Error('Invalid team member role');
        }
        onChange(value);
      }}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a role" />
      </SelectTrigger>
      <SelectContent className="w-[180px] text-muted-foreground">
        <SelectGroup>
          <SelectLabel>Organization Roles</SelectLabel>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="member">Member</SelectItem>
          <SelectItem value="readonly">Read Only Member</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
