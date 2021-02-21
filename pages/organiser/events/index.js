import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Paginator from "react-hooks-paginator";
import { LayoutOne } from "../../../layouts";
import { BreadcrumbOne } from '../../../components/Breadcrumb';
import OrganiserWrapper from '../../../components/wrapper/OrganiserWrapper';
import { Sidebar, ShopHeader, ShopProducts } from "../../../components/Shop";
import { getSortedProducts } from "../../../lib/product";
import axios from "axios";


function myEvents() {
    useEffect(() => {
        const getEvents = async () => {
            await axios.get("http://localhost:8080/api/event/all");
        }
        getEvents();
        console.log("test");
    });

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
