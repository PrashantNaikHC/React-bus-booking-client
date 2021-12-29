import React from 'react';
import classes from './ServiceProviderTile.module.css'

const ServiceProviderTile = (props) => {
return <section className={classes.content}>
    <img src='https://image.shutterstock.com/image-vector/bus-isolated-260nw-541717828.jpg'></img>
    <h2> Service name 1</h2>
    <div className={classes.rating}> rating 4.1</div>
</section>
}

export default ServiceProviderTile;