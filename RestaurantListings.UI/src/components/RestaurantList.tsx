import React from "react";
import { Restaurant } from "../interfaces/restaurant";
import { RestaurantItem } from "./RestaurantItem";
import { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import * as css from '../components/'


export interface RestaurantListProps {
    restaurants?: Restaurant[];
}


export function RestaurantList(props: RestaurantListProps) {
    const { restaurants = [] } = props;
    const [searchTerm, setSearchTerm] = useState('');

    //const labels:any = {
    //    0.5: 'Useless',
    //    1: 'Useless+',
    //    1.5: 'Poor',
    //    2: 'Poor+',
    //    2.5: 'Ok',
    //    3: 'Ok+',
    //    3.5: 'Good',
    //    4: 'Good+',
    //    4.5: 'Excellent',
    //    5: 'Excellent+',
    //};

    const useStyles = makeStyles({
        root: {
            width: 200,
            display: 'flex',
            alignItems: 'center',
        },
    });

    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);
    const classes = useStyles();
    const setrating = (e: any) => {
        const valv = 0;
        alert(e.value)
        const rate = e.value;
        restaurants.filter((valv) => {
            if (valv.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                const oldrating = valv.rating;
                
            }
              
            
        })



    }

    return (


        <div>

            <div className="App">
                <input type="text" placeholder="Search..." onChange={event => {
                    setSearchTerm(event.target.value)
                }} />
                {restaurants.filter((val) => {
                    if (searchTerm == "") {
                        return val
                    } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val
                    }
                }).map((val, key) => {


                    return (<div className="zoom">
                        
                            <div style={{ float: "left" }}>
                                <img
                                    className="photo-img"
                                    width="100px"
                                    height="100px"
                                    src={val.photoUri}
                                />
                            </div>

                            <h3>{val.name}</h3>
                            <div>{val.address}</div>
                            <div>{val.description}</div>
                        <div>{val.phoneNumber}</div>
                        
                      
                        <div className={classes.root}>
                            <Rating
                                name="hover-feedback"
                                value={val.rating}
                                precision={0.5}
                                onChange={(e) => setrating(e.target)}
                                onChangeActive={(event: any, newHover: React.SetStateAction<number>) => {
                                    setHover(newHover);
                                }}
                            />
                            {value !== null && <Box ml={2}>{}</Box>}
                        </div>
                    </div>);
                })}
            </div>
           
        </div>

    );
}
