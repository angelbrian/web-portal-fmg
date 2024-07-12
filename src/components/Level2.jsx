import { blue, red } from '@mui/material/colors';
import { colors } from '../../public/styles/colors';
import { formatCurrency } from '../helpers/formats';

export const Level2= ({ dataInfo, name, companyInit }) => {
    const { companies, months, groups, data, son } = dataInfo;
    
    return companies.map(( company ) => {
        if(company === companyInit) {
            const bg = colors()[company]['bg'];
            const color = colors()[company]['color'];
            return  <>
                        <tr style={{ fontSize: '14px', borderBottom: '1px solid black' }}>
                            <td>
                                <table>
                                    <tr>
                                        <td style={{ width: '10%', backgroundColor: bg, color, textAlign: 'center' }}>
                                        </td>
                                        <td style={{ backgroundColor: bg+'17' }}>
                                        <HeadLevel2 agroup={ son[company][name] } />
                                        </td>
                                    </tr>
                                </table>
                            </td>
                            {
                                months.map(( month ) => {
                                    
                                    if(data[month] && data[month][company]) {
                                        const balance = data[month][company]['balance'];
                                        
                                        if (balance) {
                                            return <DataLevel2 
                                                        balance={ balance } 
                                                        agroup={ son[company][name] } 
                                                        bg={ bg } 
                                                        color={ color } 
                                                    />
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

export const HeadLevel2 = ({ agroup }) => {
    console.log({ agroup });
    return <table>
            <tbody>
                {
                    Object.entries( agroup ).map(( a ) => {
                        return <>
                            <tr style={{ borderBottom: '1px solid gray' }}>
                                <td style={{ width: '18%' }}><strong>{ a[1][0]['cuenta'] }</strong></td>
                                <td style={{ width: '82%' }}><strong>{ a[1][0]['nombre'] }</strong></td>
                            </tr>
                            {
                                a[1].map(( e, index ) => {
                                    if (index !== 0) {
                                        return <tr style={{ borderBottom: '1px solid gray' }}>
                                            <td style={{ width: '18%' }}>{ e['cuenta'] }</td>
                                            <td style={{ width: '82%' }}>{ e['nombre'] }</td>
                                        </tr>
                                    }
                                })
                            }
                        </>
                    })
                }
            </tbody>
        </table>
};

export const DataLevel2 = ({ agroup, balance, bg, color }) => {
    
    return <td style={{ backgroundColor: bg, color }}>
        <table className='t-r'>
            <tbody>
                {
                    Object.entries( agroup ).map(( v ) => {
                        return v[1].map(( element ) => {
                            
                            const b = balance.find(( e ) => ( e.cuenta === element.cuenta ));
                            
                            if ( b ) {
                                const valueCurrent = formatCurrency( b['saldo-final'] );
                                const valueFormatCurrent = valueCurrent == 0 ? '------' : valueCurrent ;
                                if (v[0] === element.cuenta) {
                                    return <><tr><td><strong>{ valueFormatCurrent }</strong></td></tr></> 
                                }
                                
                                return <>
                                        <tr><td>{ valueFormatCurrent }</td></tr>
                                    </>  
                            }

                            return <>
                                        <tr><td>------</td></tr>
                                    </> 
                        })
                    })
                }
            </tbody>
        </table>
    </td>
};