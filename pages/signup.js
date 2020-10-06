import Layout from '../components/Layout'
import Link from 'next/link'
import SignupComponent from '../components/auth/SignupComponent';
const Signup = () => {
    return (
        <Layout>
            <h2 className="text-center mt-4 mb-4">Signup</h2>

            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <SignupComponent />
                </div>
            </div>
           
        </Layout>
    )
}
export default Signup;