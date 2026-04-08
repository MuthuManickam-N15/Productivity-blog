import PostEditor from '@/components/admin/PostEditor';

export default function NewPost() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        <PostEditor />
      </div>
    </div>
  );
}