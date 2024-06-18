import { Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

const UpdateDiscussion = () => {
  const navigate = useNavigate();

  return (
    <Button
      className="w-[200px]"
      icon={<Edit className="size-4" />}
      onClick={() => {
        toast.error('Delete not implemented', {
          dismissible: true,
          cancel: {
            label: 'Close',
            onClick: () => {},
          },
          duration: 3000,
          position: 'top-right',
        });
        navigate('/discussions/update');
      }}
    >
      Update Discussion
    </Button>
  );
};

export default UpdateDiscussion;
