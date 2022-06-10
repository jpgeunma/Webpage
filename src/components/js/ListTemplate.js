import React from "react";
import "../css/ListTemplate.css"

const ListTemplate = ({ form, children }) => {
    return (
        <main className="list-template">
            <div className="list-title">
                list title test
            </div>
            <section className="form-wrapper">
                {form}
            </section>
            <section className="itemList-wrapper">
                {children}
            </section>
        </main>
    );
};

export default ListTemplate;