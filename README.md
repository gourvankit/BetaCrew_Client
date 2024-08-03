# BetaCrew Mock Exchange Client

This Node.js application connects to the BetaCrew mock exchange server, retrieves stock ticker data, and generates a JSON file as output. The JSON file contains an array of objects, each representing a packet of data with increasing sequences, ensuring none of the sequences are missing.

## Requirements

- Node.js version 16.17.0 or higher
- The BetaCrew mock exchange server files

## Setup

### 1. Clone the Repository

```bash
git clone <repo_url>
cd betacrew_client
npm install (Installing dependencies)
run the main.js file using node main.js and wait for the TCP server up and running
run the client.js file and an stock_output file will be created consisting of the necessary outputs.

// Gourvankit Singh Bhati
