import { SecretariesList } from '@/app/components/features/dashboard/funcionarios/secretarios';
import serverApi from '@/app/lib/api/server-api';
import { Teacher } from '@/app/types';

const SECRETARY_TYPE_ID = 2;

async function SecretariesPage() {
  const secretaries = await serverApi.get<Teacher[]>('/teachers', { type_id: SECRETARY_TYPE_ID });

  return <SecretariesList secretaries={secretaries} />;
}

export default SecretariesPage;