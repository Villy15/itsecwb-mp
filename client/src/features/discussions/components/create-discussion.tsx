import { PlusIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';

const CreateDiscussion = () => {
  const navigate = useNavigate();

  return (
    <Button
      icon={<PlusIcon className="size-4" />}
      onClick={() => {
        navigate('/discussions/add');
      }}
    >
      Create Discussion
    </Button>
  );
};

export default CreateDiscussion;
