import Select from 'react-select';
import { Label } from '@/components/ui/Label';
import { useTheme } from 'next-themes';

const darkThemeStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: '#111827', // slate-950 from Tailwind's color palette
    borderColor: '#374151', // gray-600 from Tailwind's color palette
    color: '#D1D5DB', // slate-200 from Tailwind's color palette
    '&:hover': {
      borderColor: '#4B5563', // slate-600 from Tailwind's color palette
    },
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isSelected
      ? '#374151' // slate-700 from Tailwind's color palette
      : isFocused
      ? '#111827' // slate-950 from Tailwind's color palette
      : '#1F2937', // slate-900 from Tailwind's color palette
    color: '#D1D5DB', // slate-200 from Tailwind's color palette
  }),
  singleValue: (styles) => ({
    ...styles,
    color: '#D1D5DB', // slate-200 from Tailwind's color palette
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: '#374151', // slate-700 from Tailwind's color palette
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: '#D1D5DB', // slate-200 from Tailwind's color palette
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: '#D1D5DB', // slate-200 from Tailwind's color palette
    '&:hover': {
      backgroundColor: '#F87171', // red-400 from Tailwind's color palette
      color: '#D1D5DB', // slate-200 from Tailwind's color palette
    },
  }),
  clearIndicator: (styles) => ({
    ...styles,
    color: '#D1D5DB', // slate-200 from Tailwind's color palette
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: '#1F2937', // slate-900 from Tailwind's color palette
  }),
};

type Option = {
  value: string;
  label: string;
};

export const OrganizationUsersSelect = ({
  users,
  value,
  onChange,
}: {
  users: Array<Option>;
  value?: Option;
  onChange: (value: Option) => void;
}) => {
  const { theme } = useTheme();

  return (
    <div>
      <Label className="text-muted-foreground">Select user</Label>
      <Select
        value={value}
        onChange={onChange}
        options={users}
        className="mt-1"
        styles={theme === 'dark' ? darkThemeStyles : {}}
      />
    </div>
  );
};
