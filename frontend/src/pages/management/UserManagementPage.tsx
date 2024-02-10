import UserTable from "../../components/UserTable/UserTable"
import UserTableHeader from "../../components/UserTable/UserTableHeader"
import AdminGuard from "../../guards/AdminGuard"
import { useManagement } from "../../redux/adminSlice"


function UserManagementPage() {


    return <div>

        <UserTableHeader/>

        <UserTable/>
    </div>
}
export default AdminGuard(UserManagementPage)