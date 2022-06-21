//node modules
import React, { Component } from "react";

//components
import Navbar from "../../Navbar/Navigation";
import NavbarAdmin from "../../Navbar/NavigationAdmin";
import getWeb3 from "../../../getWeb3";
import Election from "../../../contracts/Election.json";
import AdminOnly from "../../AdminOnly";

//css
import "./AddCandidate.css";

export default class AddCandidate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ElectionInstance: undefined,
      web3: null,
      accounts: null,
      isAdmin: false,
      header: "",
      image:"",
      slogan: "",
      candidates: [],
      candidateCount: undefined,
    };
  }

  componentDidMount = async () => {
    // refreshing page only once
    if (!window.location.hash) {
      window.location = window.location + "#loaded";
      window.location.reload();
    }

    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Election.networks[networkId];
      const instance = new web3.eth.Contract(
        Election.abi,
        deployedNetwork && deployedNetwork.address );
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({
        web3: web3,
        ElectionInstance: instance,
        account: accounts[0],
      });

      // Total number of candidates
      const candidateCount = await this.state.ElectionInstance.methods
        .getTotalCandidate()
        .call();
      this.setState({ candidateCount: candidateCount });

      const admin = await this.state.ElectionInstance.methods.getAdmin().call();
      if (this.state.account === admin) {
        this.setState({ isAdmin: true });
      }

      // Loading Candidates details
      for (let i = 0; i < this.state.candidateCount; i++) {
        const candidate = await this.state.ElectionInstance.methods
          .candidateDetails(i)
          .call();
        this.state.candidates.push({
          id: candidate.candidateId,
          header: candidate.header,
          image: candidate.image,
          slogan: candidate.slogan,
        });
      }

      this.setState({ candidates: this.state.candidates });
    } catch (error) {
      // Catch any errors for any of the above operations.
      console.error(error);
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
    }
  };
  updateHeader = (event) => {
    this.setState({ header: event.target.value });
  };
  updateimage = (event) => {
    this.setState({ image: event.target.value });
  };
  updateSlogan = (event) => {
    this.setState({ slogan: event.target.value });
  };

  addCandidate = async () => {
    await this.state.ElectionInstance.methods
      .addCandidate(this.state.header, this.state.slogan,this.state.image)
      .send({ from: this.state.account, gas: 1000000 });
    window.location.reload();
  };

  //render page 

  render() {
    if (!this.state.web3) {
      return (
        <>
          {this.state.isAdmin ? <NavbarAdmin /> : <Navbar />}
          <center>Loading Web3, accounts, and contract...</center>
        </>
      );
    }
    if (!this.state.isAdmin) {
      return (
        <>
          <Navbar />
          <AdminOnly page="Add Candidate Page." />
        </>
      );
    }
    return (
      <>
        <NavbarAdmin />
        <div id="form2">
          
          <div className="p-2" id="abtc">
           <div>
            <h3>Add Candidates</h3>
            <small>Total candidates: {this.state.candidateCount}</small>
            <form className="form">
              <label className={"label-ac"}>
                Candidate Name
                <input
                  className={"input-ac"}
                  type="text"
                  placeholder="Full Name"
                  value={this.state.header}
                  onChange={this.updateHeader}
                />
              </label>
              <label className={"label-ac"}>
                Candidate Image
                <input
                  className={"input-ac"}
                  type="url"
                  placeholder="Image URL"
                  required
                  value={this.state.image}
                  onChange={this.updateimage}
                />
              </label>
              <label className={"label-ac"}>
                Party Name
                <input
                  className={"input-ac"}
                  type="text"
                  placeholder="Party Name"
                  required
                  value={this.state.slogan}
                  onChange={this.updateSlogan}
                />
              </label>
              <center>
              <button
                id="btnAdd"
                disabled={
                  this.state.header.length < 7||
                  this.state.slogan.length > 20||
                  this.state.slogan.length < 3||
                  this.state.image.length < 20
                  
                  
                }
                onClick={this.addCandidate}
              >
                Add
              </button>
              </center>
            </form>
            </div>
          </div>
        </div>
        {loadAdded(this.state.candidates)}
      </>
    );
  }
}
export function loadAdded(candidates) {
  const renderAdded = (candidate) => {
    return (
      <>
            <table id="Canlist">
              
              <tr>
                <td>
                 <img src={candidate.image} alt="Candidate Pic" width="150px" height="150px"></img> 
                </td>
                <td>
                {candidate.id}. <strong>{candidate.header}</strong><br/>{candidate.slogan}
                </td>
                
              </tr>
            </table>
      </>
    );
  };

  return (
    <div className="container-main" style={{ borderTop: "1px solid" }}>
      <div id="info">
        <center>Candidates List</center>
      </div>
      {candidates.length < 1 ? (
        <div className="container-item alert">
          <center>No candidates added.</center>
        </div>
      ) : (
        <div id="abtcl" style={{display: "block",backgroundColor: "#DDFFFF",}}>
  
             {candidates.map(renderAdded)} 
            
          
        </div>
      )}
    </div>
  );
}

