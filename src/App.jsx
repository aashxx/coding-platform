import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from './admin/pages/Dashboard';
import Leaderboard from './admin/pages/Leaderboard';
import Participants from './admin/pages/Participants';
import Sidebar from './admin/components/Sidebar';
import ProblemAllotment from './admin/pages/ProblemAllotment';
import Problems from './client/pages/Problems';
import ProblemsState from './client/contexts/ProblemsContext';
import DSAIDE from './client/pages/ide/DSAIDE';
import DebuggingIDE from './client/pages/ide/DebuggingIDE';
import SQLIDE from './client/pages/ide/SQLIDE';
import WebProgrammingIDE from './client/pages/ide/WebProgrammingIDE';
import Home from './client/pages/Home';
import { Toaster } from 'react-hot-toast';
import TeamsState from './admin/contexts/TeamsContext';
import ProtectedAdmin from './admin/components/ProtectedAdmin';
import AddProblems from './admin/pages/AddProblems';
import AllProblemsState from './admin/contexts/AllProblemsContext';
import AllProblems from './admin/pages/AllProblems';

const App = () => {

    return (
        <Router>
            <TeamsState>
                <AllProblemsState>
                    <ProblemsState>
                        <div className="flex min-h-screen">
                            <AdminLayout>
                                <Routes>
                                    <Route path='/' element={<Home />} />
                                    {/* Admin Routes */}
                                    <Route path="/admin/dashboard" element={<ProtectedAdmin><Dashboard /></ProtectedAdmin>} />
                                    <Route path="/admin/allot-problems" element={<ProtectedAdmin><ProblemAllotment /></ProtectedAdmin>} />
                                    <Route path="/admin/add-problems" element={<ProtectedAdmin><AddProblems /></ProtectedAdmin>} />
                                    <Route path="/admin/leaderboard" element={<ProtectedAdmin><Leaderboard /></ProtectedAdmin>} />
                                    <Route path="/admin/participants" element={<ProtectedAdmin><Participants /></ProtectedAdmin>} />
                                    <Route path='/admin/all-problems' element={<ProtectedAdmin><AllProblems /></ProtectedAdmin>} />

                                    {/* Client Routes */}
                                    <Route path="/editor/:team" element={<Problems />} />

                                    {/* Dynamic IDE Routes */}
                                    <Route path="/editor/:team/dsa/:problemId" element={<DSAIDE />} />
                                    <Route path="/editor/:team/debugging/:problemId" element={<DebuggingIDE />} />
                                    <Route path="/editor/:team/sql/:problemId" element={<SQLIDE />} />
                                    <Route path="/editor/:team/web/:problemId" element={<WebProgrammingIDE />} />
                                </Routes>
                            </AdminLayout>
                        </div>
                        <Toaster />
                    </ProblemsState>
                </AllProblemsState>
            </TeamsState>
        </Router>
    );
};

const AdminLayout = ({ children }) => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
        <div className="flex w-full min-h-screen">
            {isAdminRoute && <Sidebar />}
            <div className={`flex-grow ${isAdminRoute ? 'p-6 bg-gray-900' : ''}`}>
                {children}
            </div>
        </div>
    );
};

export default App;