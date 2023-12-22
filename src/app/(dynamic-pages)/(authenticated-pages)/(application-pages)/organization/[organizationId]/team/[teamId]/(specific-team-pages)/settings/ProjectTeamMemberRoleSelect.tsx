'use client';

import * as React from 'react';
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

type ProjectTeamMemberRoleSelectProps = {
  value: Enum<'project_team_member_role'>;
  onChange: (value: Enum<'project_team_member_role'>) => void;
  isLoading: boolean;
};

// typeguard to narrow string to Enum<'project_team_member_role'>
function isTeamMemberRole(
  value: string,
): value is Enum<'project_team_member_role'> {
  return ['admin', 'member', 'readonly'].includes(value);
}

export function ProjectTeamMemberRoleSelect({
  value,
  onChange,
  isLoading = false,
}: ProjectTeamMemberRoleSelectProps) {
  return (
    <Select
      disabled={isLoading}
      value={value}
      onValueChange={(value) => {
        if (!isTeamMemberRole(value)) {
          throw new Error('Invalid team member role');
        }
        onChange(value);
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Roles</SelectLabel>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="member">Member</SelectItem>
          <SelectItem value="readonly">Read Only Member</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
