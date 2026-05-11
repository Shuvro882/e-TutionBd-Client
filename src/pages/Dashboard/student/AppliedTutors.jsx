import React from "react";

const AppliedTutors = () => {
  return (
    <div className="p-4 md:p-6">
      
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold">Applied Tutors</h2>
        <p className="text-gray-500 mt-1">
          Review tutor applications for your posted tuitions.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        
        <div className="bg-white shadow rounded-2xl p-5 border">
          <h3 className="text-gray-500 text-sm">Total Applications</h3>
          <p className="text-3xl font-bold mt-2">24</p>
        </div>

        <div className="bg-white shadow rounded-2xl p-5 border">
          <h3 className="text-gray-500 text-sm">Pending</h3>
          <p className="text-3xl font-bold mt-2">12</p>
        </div>

        <div className="bg-white shadow rounded-2xl p-5 border">
          <h3 className="text-gray-500 text-sm">Approved</h3>
          <p className="text-3xl font-bold mt-2">5</p>
        </div>

      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search tutors..."
          className="input input-bordered w-full md:w-80"
        />
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto bg-white shadow rounded-2xl border">
        
        <table className="table">
          
          {/* head */}
          <thead className="bg-base-200">
            <tr>
              <th>Tutor</th>
              <th>Qualification</th>
              <th>Experience</th>
              <th>Expected Salary</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {/* Row 1 */}
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <img
                    src="https://i.ibb.co.com/0jqHpnp/avatar.png"
                    alt=""
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-semibold">Rahim Ahmed</p>
                    <p className="text-sm text-gray-500">
                      rahim@example.com
                    </p>
                  </div>
                </div>
              </td>

              <td>BSc in Mathematics</td>

              <td>3 Years</td>

              <td>$120/month</td>

              <td>
                <span className="badge badge-warning">
                  Pending
                </span>
              </td>

              <td>
                <div className="flex gap-2">
                  <button className="btn btn-sm btn-outline">
                    View
                  </button>

                  <button className="btn btn-sm btn-success text-white">
                    Accept
                  </button>

                  <button className="btn btn-sm btn-error text-white">
                    Reject
                  </button>
                </div>
              </td>
            </tr>

            {/* Row 2 */}
            <tr>
              <td>
                <div className="flex items-center gap-3">
                  <img
                    src="https://i.ibb.co.com/0jqHpnp/avatar.png"
                    alt=""
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div>
                    <p className="font-semibold">Nusrat Jahan</p>
                    <p className="text-sm text-gray-500">
                      nusrat@example.com
                    </p>
                  </div>
                </div>
              </td>

              <td>English Literature</td>

              <td>2 Years</td>

              <td>$100/month</td>

              <td>
                <span className="badge badge-success">
                  Approved
                </span>
              </td>

              <td>
                <div className="flex gap-2">
                  <button className="btn btn-sm btn-outline">
                    View
                  </button>

                  <button className="btn btn-sm btn-disabled">
                    Accepted
                  </button>
                </div>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppliedTutors;