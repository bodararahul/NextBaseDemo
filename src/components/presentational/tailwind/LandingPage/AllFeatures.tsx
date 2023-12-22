import { T } from '@/components/ui/Typography';
import TaskIcon from 'lucide-react/dist/esm/icons/file';
import TeamIcon from 'lucide-react/dist/esm/icons/users';
import ProjectIcon from 'lucide-react/dist/esm/icons/layers';
import ResourceIcon from 'lucide-react/dist/esm/icons/book';
import RiskIcon from 'lucide-react/dist/esm/icons/traffic-cone';
import ReportIcon from 'lucide-react/dist/esm/icons/file-text';
import DocumentIcon from 'lucide-react/dist/esm/icons/file';
import TimeIcon from 'lucide-react/dist/esm/icons/clock-3';
import BudgetIcon from 'lucide-react/dist/esm/icons/circle-dollar-sign';
import CommunicationIcon from 'lucide-react/dist/esm/icons/smartphone-nfc';
import CustomerIcon from 'lucide-react/dist/esm/icons/user-2';
import QualityIcon from 'lucide-react/dist/esm/icons/shield-check';
import ChangeIcon from 'lucide-react/dist/esm/icons/undo-2';
import ProcurementIcon from 'lucide-react/dist/esm/icons/store';
import StakeholderIcon from 'lucide-react/dist/esm/icons/building';
import IntegrationIcon from 'lucide-react/dist/esm/icons/heart-handshake';
import ScopeIcon from 'lucide-react/dist/esm/icons/line-chart';

const features = [
  {
    name: 'Lorem Ipsum Dolor',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    icon: <TaskIcon className="group-hover:-8" />,
  },
  {
    name: 'Sit Amet Consectetur',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    icon: <TeamIcon className="group-hover:-8" />,
  },
  {
    name: 'Adipiscing Elit Sed',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    icon: <ProjectIcon className="group-hover:-8" />,
  },
  {
    name: 'Eiusmod Tempor Incididunt',
    description:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    icon: <ResourceIcon className="group-hover:-8" />,
  },
  {
    name: 'Ut Labore et Dolore',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    icon: <RiskIcon className="group-hover:-8" />,
  },
  {
    name: 'Magna Aliqua Ut',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    icon: <ReportIcon className="group-hover:-8" />,
  },
  {
    name: 'Enim Ad Minim',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    icon: <DocumentIcon className="group-hover:-8" />,
  },
  {
    name: 'Veniam Quis Nostrud',
    description:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    icon: <TimeIcon className="group-hover:-8" />,
  },
  {
    name: 'Exercitation Ullamco',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    icon: <BudgetIcon className="group-hover:-8" />,
  },
  {
    name: 'Laboris Nisi Ut',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    icon: <CommunicationIcon className="group-hover:-8" />,
  },
  {
    name: 'Aliquip Ex Ea',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    icon: <CustomerIcon className="group-hover:-8" />,
  },
  {
    name: 'Commodo Consequat',
    description:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    icon: <QualityIcon className="group-hover:-8" />,
  },
  {
    name: 'Duis Aute Irure',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    icon: <ChangeIcon className="group-hover:-8" />,
  },
  {
    name: 'Dolor in Reprehenderit',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    icon: <ProcurementIcon className="group-hover:-8" />,
  },
  {
    name: 'In Voluptate Velit',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    icon: <StakeholderIcon className="group-hover:-8" />,
  },
  {
    name: 'Esse Cillum Dolore',
    description:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    icon: <IntegrationIcon className="group-hover:-8" />,
  },
  {
    name: 'Eu Fugiat Nulla',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    icon: <ScopeIcon className="group-hover:-8" />,
  },
];

const AllFeatures = () => {
  return (
    <section>
      <div className="py-8 px-4 mx-auto md:container sm:pb-24 md:px-6 lg:px-6">
        <div className="mb-8 lg:mb-16 max-w-3xl mx-auto  w-full">
          <div className=" flex items-center justify-start md:justify-center w-full">
            <div className="mb-4 border border-gray-300 bg-muted dark:bg-slate-800 dark:border-gray-700 rounded-lg shadow-sm px-2 py-[2px]">
              <T.Small className="text-gray-600 dark:text-slate-400">
                Features
              </T.Small>
            </div>
          </div>
          <h2 className="mb-5 text-4xl leading-[44px] md:text-center  font-semibold text-gray-900 dark:text-white">
            Lorem ipsum dolor sit amet
          </h2>
          <p className="text-gray-500 sm:text-xl sm:leading-[30px] md:text-center dark:text-slate-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
          {features.map((feature) => {
            return (
              <div key={feature.name} className="group">
                <div className="flex items-center justify-center border border-gray-300 dark:border-slate-700 bg-muted group-hover:bg-gray-50 group-hover:shadow-xl dark:bg-slate-800 group-hover:dark:bg-gray-700 w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900">
                  {feature.icon}
                </div>
                <T.H3 className="mb-2 mt-5 tracking-normal text-xl leading-[30px] font-bold dark:text-slate-50">
                  {feature.name}
                </T.H3>
                <T.P className="font-normal text-gray-600 dark:text-slate-400">
                  {feature.description}
                </T.P>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AllFeatures;
