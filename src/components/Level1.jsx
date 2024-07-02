import { useState } from 'react';
import { colors } from '../../public/styles/colors';
import { Level2 } from './Level2';
import { formatCurrency } from '../helpers/formats';

export const Level1 = ({ dataInfo, name }) => {
    const { companies, months, groups, data, son } = dataInfo;
    const [open, setOpen] = useState({});
    let firstHead = '';
    
    return companies.map(( company ) => {
        const bg = colors()[company]['bg'];
        const color = colors()[company]['color'];
        return  <>
                    <tr className='my-other-step' style={{ fontSize: '16px', borderBottom: '1px solid black' }} onClick={() => setOpen({ ...open, [company]: !open[company] })}>
                        <td style={{ width: '50%' }}>
                            <table style={{ width: '100%', backgroundColor: 'gray', color: 'white' }}>
                                <tr>
                                    <td style={{ width: '10%', backgroundColor: bg, color, textAlign: 'center' }}>
                                        { company }
                                    </td>
                                    <td style={{ width: '90%', backgroundColor: bg+'17' }}>
                                    {
                                        months.map(( month ) => {
                                            if(data[month] && data[month][company] && firstHead !== company) {
                                                const balance = data[month][company]['balance'];
                                                const agroup = groups[company].filter( c => {
                                                    return c.name === name;
                                                })[0];
                                                firstHead = company;
                                                if (agroup && balance) {
                                                    return <HeadLevel1 balance={ balance } agroup={ agroup } />
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
                                        return <DataLevel1 balance={ balance } agroup={ agroup } bg={ bg } color={ color } />
                                    }
                                }
                                return <td style={{ width: '10%' }}></td>

                            })
                        }
                    </tr>
                    {
                        open[company] && 
                        <Level2 dataInfo={ dataInfo } name={ name } companyInit={ company } />
                    }
                </>
    });
};

export const DataLevel1 = ({ agroup, balance, index, bg, color }) => {
    let sum = 0;
    return <td style={{ width: '10%', backgroundColor: bg, color }}>
        <table>
            <tbody>
                {
                    balance.map(( b ) => {
                        const fBalanceAgroup = agroup['data'].find(( e ) => e === b['cuenta'])
                        if (fBalanceAgroup) {
                            sum += Math.round( b['saldo-final'] );
                            return <tr>
                                { 
                                    index === 1 && <td className='padding-custom'>
                                        company
                                    </td>
                                }
                                <td className='t-r padding-custom'>{ formatCurrency( b['saldo-final'] ) }</td>
                            </tr>
                        }
                    })
                }
                <tr><td className='t-r padding-custom'><strong>{ formatCurrency( sum ) }</strong></td></tr>
            </tbody>
        </table>
    </td>
};

export const HeadLevel1 = ({ agroup, balance }) => {
    return <table>
            <tbody>
                {
                    balance.map(( b ) => {
                        const fBalanceAgroup = agroup['data'].find(( e ) => e === b['cuenta'])
                        if (fBalanceAgroup) {
                            return <tr>
                                <td style={{ width: '100%', borderBottom: '1px solid white', fontWeight: 'bold'  }}>
                                    <table>
                                        <tr>
                                            <td className='padding-custom' style={{ width: '10%' }}>{ b['cuenta'] }</td>
                                            <td className='ellipsis' style={{ width: '90%' }}>{ b['nombre'] }</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        }
                    })
                }
                <tr><td className='padding-custom' style={{ width: '100%', borderBottom: '1px solid white', fontWeight: 'bold'  }}><strong>Total</strong></td></tr>
            </tbody>
        </table>
};
