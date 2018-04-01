import React from "react";

export default class Table extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="table-wrapper">
            {
                    this.props.data ? <table>
                        <tbody>
                            {
                                this.props.data.map((rows, index) =>
                                    <tr key={index}>
                                        {
                                            rows.map((cell, index) =>
                                                <td key={index}>{cell}</td>
                                            )
                                        }
                                    </tr>
                                )
                            }
                        </tbody>
                    </table> : null
            }
            </div>
        );
    }
}
