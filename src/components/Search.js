import React, { Components } from 'react';
import Moment from "react-moment";
import 'moment-timezone';
import '../Search.css';

class Search extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            query: '',
            tags: "story",
            by: "popularity",
            results: {},
            loading: false,
            message: '',
            fetchedData : []
        }
        this.handleOnInputChange = this.handleOnInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit =(e)=>{
        e.preventDefault();
       console.log(this.state.query);
       console.log(this.state.tag);
       var data = {
            query : this.state.query,
            tags : this.state.tags,
        };
        console.log(data);
        var change;
        if(this.state.by=="date")
            change = "search_by_date";
        else
            change = "search";
       fetch(`https://hn.algolia.com/api/v1/${change}?query=${data.query}&tags=${data.tags}`,{
            method: "GET",
            dataType: "json",
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
            var data = result.hits.map((h,i)=>(
                <div className="row" key={i}>
                    <h3>{h.title}</h3><Moment fromNow>{h.created_at}</Moment> | {h.comment_text}{h.points} points | {h.num_comments} comments | {h.author} | <a href={h.url}>{h.url}</a>
                    <hr />
                </div>
            ))
            this.setState({fetchedData : data});
        })
        .catch(err => console.log(err))
    }
    handleOnInputChange = ( event ) =>{
        // const query = event.target.value;
        this.setState( { [event.target.id]: event.target.value, loading: true, message: '' } )
    };

    componentDidMount=()=>{
        var data = {
            query : this.state.query,
            tags : this.state.tags,
        };
        fetch("https://hn.algolia.com/api/v1/search",{
            method: "GET",
            dataType: "json",
            params : JSON.stringify(data),
        }).then(res => res.json())
        .then(result => {
            var data = result.hits.map((h,i)=>(
                <div className="row" key={i}>
                    <h3>{h.title}</h3><Moment fromNow>{h.created_at}</Moment> | {h.points} points | {h.num_comments} comments | {h.author} | <a href={h.url}>{h.url}</a> 
                    <hr/>
                </div>
            ))
            this.setState({fetchedData : data});
        })
        .catch(err => console.log(err))
    }
    render(){ 
        var query = this.state.query;
    return (<div>
        <div className = " backcolor ">
        <div class="container">
        <h2 class="heading">Search React App</h2>
        <form onSubmit={this.handleSubmit}>
        <label class="search-label" htmlFor="search-input">
            <input
            type="text"
            id= "query"
            name="query"
            value={this.state.query}
        
            placeholder="Search..."
            onChange={this.handleOnInputChange}
            />
        <i class="fa fa-search search-icon"  aria-hidden="true" onClick={this.handleSubmit} />
        </label>
        
        <div class='filter'>
        <label for="tags">Search</label>
        <select id='tags' name='type' onChange ={this.handleOnInputChange} value={this.state.tags}>
            <option value="story" id='story' selected>Stories</option>
            <option value="comment" id='comment'>Comments</option>
        </select> 
        <label for="by">By</label>
        <select id='by' name='by' value={this.state.by}  onChange ={this.handleOnInputChange}>
            <option value="date" id='date'>Date</option>
            <option value="popularity" id='popularity' selected>Popularity</option>
        </select>
        <label for="for">For</label>
        <select id='for' name='dateRange'>
            <option id='f1' value="all" selected>All Time</option>
            <option id='f2' value="last24h">Last 24hrs</option>
            <option id='f3' value="pastWeek">Past Week</option>
            <option id='f4' value="pastMonth">Past Month</option>
            <option id='f5' value="pastYear">Past Year</option>

        </select>
        
    <span class='result pull-right'>
    </span>
</div>
</form>
<hr />

</div>
</div>
<br/>
<br/>
<br/>
    <div class="container ok">
        {this.state.fetchedData}
    </div>
</div>

)
}
}

//export const Greet = () => <h1>Hello vishwas</h1>

export default Search