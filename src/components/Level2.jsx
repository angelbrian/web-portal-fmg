import { colors } from '../../public/styles/colors';
import { formatCurrency } from '../helpers/formats';

export const Level2= ({ dataInfo, name, companyInit }) => {
    const { companies, months, groups, data, son } = dataInfo;
    let firstHead = '';
    
    return companies.map(( company ) => {
        if(company === companyInit) {
            const bg = colors()[company]['bg'];
            const color = colors()[company]['color'];
            return  <>
                        <tr>
                            <td>
                                <table>
                                    <tr>
                                        <td style={{ width: '10%', backgroundColor: bg, color, textAlign: 'center' }}>
                                            {/* { company } */}
                                        </td>
                                        <td style={{ backgroundColor: bg+'17' }}>
                                        {
                                            months.map(( month ) => {
                                                
                                                if(data[month] && data[month][company] && firstHead !== company) {
                                                    const balance = data[month][company]['balance'];
                                                    const agroup = groups[company].filter( c => {
                                                        return c.name === name;
                                                    })[0];
                                                    firstHead = company;
                                                    if (agroup && balance) {
                                                        return <HeadLevel2 balance={ balance } agroup={ agroup } />
                                                    }
                                                } 

                                            })
                                        }
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            {
                                months.map(( month ) => {
                                    
                                    if(data[month] && data[month][company]) {
                                        const balance = data[month][company]['balance'];
                                        const agroup = groups[company].filter( c => {
                                            return c.name === name;
                                        })[0];
                                        
                                        if (agroup && balance) {
                                            return <DataLevel2 balance={ balance } agroup={ agroup } son={ son } company={ company } />
                                        }
                                    }
                                    return <td></td>

                                })
                            }
                        </tr>
                    </>
        }
    });
};

export const DataLevel2 = ({ agroup, balance, company, son }) => {
    // let sum = 0;
    return <td>
        <table>
            <tbody>
                {
                    balance.map(( b ) => {
                        const fBalanceAgroup = agroup['data'].find(( e ) => e === b['cuenta'])
                        // if (fBalanceAgroup) {
                        //     const exists = son[company][agroup['name']][fBalanceAgroup];
                        //     console.log({ fBalanceAgroup, exists });
                        // }
                        if (fBalanceAgroup) {
                            const exists = son[company][agroup['name']][fBalanceAgroup];
                            return <tr>
                                        <td style={{ width: '100%' }}>
                                            <table>
                                                <tr>
                                                    <td><strong>{ formatCurrency( b['saldo-final'] ) }</strong></td>
                                                    {/* <td><strong>{ b['cuenta'] }</strong></td> */}
                                                </tr>
                                                {
                                                    b['data'].length === 0 && <tr><td>---</td></tr>
                                                }
                                                {
                                                    exists.map(( et ) => {
                                                        const coincidence = b['data'].find(( d ) => d.cuenta === et)
                                                        if ( coincidence )
                                                            return <tr><td>{ formatCurrency( coincidence['saldo-final'] ) }</td></tr>;
                                                        return <tr><td>{ formatCurrency( 0 ) }</td></tr>
                                                    })
                                                }
                                            </table>
                                        </td>
                                    </tr>
                        }
                    })
                }
            </tbody>
        </table>
    </td>
};

export const HeadLevel2 = ({ agroup, balance, index }) => {
    return <table>
            <tbody>
                {
                    balance.map(( b ) => {
                        const fBalanceAgroup = agroup['data'].find(( e ) => e === b['cuenta'])
                        if (fBalanceAgroup) {
                            const init = fBalanceAgroup.split('-')[0];
                            return <tr>
                                <td style={{ width: '100%' }}>
                                    <table>
                                        <tr>
                                            <td style={{ width: '10%' }}><strong>{ b['cuenta'] }</strong></td>
                                            <td className='ellipsis' style={{ width: '90%' }}><strong>{ b['nombre'] }</strong></td>
                                        </tr>
                                        {
                                            b['data'].map(( e ) => {
                                                return <tr>
                                                    <td style={{ width: '10%' }}>{ e['cuenta'] }</td>
                                                    <td style={{ width: '90%' }}>{ e['nombre'] }</td>
                                                </tr>
                                            })
                                        }
                                    </table>
                                </td>
                            </tr>
                        }
                    })
                }
            </tbody>
        </table>
};
