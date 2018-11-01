import React, { Component } from 'react';
import axios from 'axios';
import {Jumbotron, Grid, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
          originalAssay: [],
          response: [],
          assay: [],
          currentNameInput: '',
          currentIdInput: '',
          currentPage: 1,
          rowsPerPage: 10
        }
        this.handleClick = this.handleClick.bind(this);
      }

      async componentDidMount() {
        await this.results();
        const assay = await this.renderContent();
        this.setState({
            assay,
            originalAssay: assay
        });
        console.log(this.state.assay)
      }

      async results() {
        await axios.get('http://localhost:5000/posts')
        .then(res => {
          this.setState({ response: res.data })
        })
        .catch((err) => { console.log(err); });
      }

      handleClick(event) {
        let listid = Number(event.target.id);
        this.setState({
            currentPage: listid
        });
    }

      handleIdInput(e){
        this.setState({
            currentIdInput: e.target.value
        })


    }

    handleNameInput(e){
        this.setState({
            currentNameInput: e.target.value
        })

    }

    handleSubmit(e){
        e.preventDefault()
        let filterArray = this.state.assay.filter(current=>{
            return current.aid.toString().includes(this.state.currentIdInput);
        })
        filterArray = filterArray.filter(current=>{
            return current.assay_source_name.toString().includes(this.state.currentNameInput);
        })
        this.setState({
            assay: filterArray
        })
    }

      renderContent() {
        let temp = this.state.response;
        temp.map(data => {
          return Object.values(data);
        })
        return temp;
      }

      render() {
        let first = this.state.response[0];
        let keys = [];
        for(let key in first){
          keys.push(key);
        }
        let count = 0;

        const {currentPage, rowsPerPage} = this.state;
        const indexOfLastRow = currentPage * rowsPerPage;
        const indexOfFirstRow = indexOfLastRow - rowsPerPage;
        const currentRows = this.state.assay.slice(indexOfFirstRow, indexOfLastRow);
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.state.assay.length / rowsPerPage); i++) {
            pageNumbers.push(i);
          }
          const renderPageNumbers = pageNumbers.map(number => {
            return (
              <td
                key={number}
                id={number}
                onClick={this.handleClick}
              >
                {number}
              </td>
            );
          });


        return (
          <div className="App">
          <Grid>
          <FormGroup>
          <ControlLabel>Search by aid</ControlLabel>
                <input type="text" onChange={e=>this.handleIdInput(e)}/>
          <ControlLabel>Search by assay_source_name</ControlLabel>
                <input type="text" onChange={e=>this.handleNameInput(e)}/>
                <button onClick={e=>this.handleSubmit(e)}>Submit</button>
                <button onClick={()=>this.setState({assay:this.state.originalAssay})}>Refresh</button>
          </FormGroup>
          <table width="10%" height="50%">
            <thead>
              <tr>
                {keys.map(data => {
                  return (
                  <th key={data}>{data}</th>
                  )
                })}
              </tr>
            </thead>
            <tbody height="10%">
                 {
                  currentRows.map(data => {
                    return (
                      <tr>
                        {
                          Object.values(data).map(each => {
                            return (
                            <td>{each}</td>
                          )
                          })
                       }
                      </tr>
                    )

                  })
                }
            </tbody>
          </table>
          <div>
                    <table id="page-numbers">
                    {renderPageNumbers}
                    </table>
                </div>
          </Grid>
          </div>
        );
      }
}

export default Search;
