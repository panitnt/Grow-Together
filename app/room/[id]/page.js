import { useRouter } from 'next/router';

const Page = () => {
    const router = useRouter();
    const { id } = router.query; // Access the dynamic route parameter
  return (
    <div>

    </div>
  )
}

export default Page