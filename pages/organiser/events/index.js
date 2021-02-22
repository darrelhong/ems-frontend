import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { connect } from "react-redux";
import { BreadcrumbOne } from '../../../components/Breadcrumb';
import OrganiserWrapper from '../../../components/wrapper/OrganiserWrapper';
import api from "../../../lib/ApiClient";


function myEvents() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const getEvents = async () => {
            const { data } = await api.get("/api/event/all");

            setEvents(data);
        }
        getEvents();
    }, []);

    return (
        <div>

            <OrganiserWrapper title="Events">
                <BreadcrumbOne pageTitle="My Events">
                    <ol className="breadcrumb justify-content-md-end">
                        <li className="breadcrumb-item">
                            <Link href="/organiser/events">
                                <a>Events</a>
                            </Link>
                        </li>
                    </ol>
                </BreadcrumbOne>
            </OrganiserWrapper>



        </div>

    )
}

export default myEvents;
