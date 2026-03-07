import ShowForm from '../ShowForm';

export default function NewShowPage() {
    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-black uppercase tracking-tighter text-white">Add New Show</h1>
                <p className="text-gray-400 mt-2 font-medium">Create a new upcoming gig.</p>
            </div>
            <ShowForm />
        </div>
    );
}
