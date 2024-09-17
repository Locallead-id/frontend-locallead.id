import PopupModal from "@/components/shared/modal-add-employee";
import TableSearchInput from "@/components/shared/table-search-input";
import EmployeeCreateForm from "../employee-forms/employee-create-form";

export default function EmployeeTableActions() {
  return (
    <div className='flex items-center justify-between gap-2 py-5'>
      <div className='flex flex-1 gap-4'>
        <TableSearchInput placeholder='Search People Here' />
      </div>
      <div className='flex gap-3'>
        <PopupModal
          renderModal={(onClose) => <EmployeeCreateForm modalClose={onClose} />}
        />
      </div>
    </div>
  );
}
