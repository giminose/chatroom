MCVP address space view planning
=====

[TOC]

###### tags: `mcvp` `address space` `bus` `memory` `config` `max`


## Goal

Design a flow for user to define address space view of multi-core vp environment.


### Assumption

We assume that user will provide an address space configuration file for mcvp.

## Step goal

### 1. Design address space configuration file format

:::info
#### ToDo 

* Provide address space configuration file format. [name=]
:::

:::spoiler
![figure1](https://osp.computing.ncku.edu.tw:3001/uploads/upload_dedb828680d5c4a7a9b9f58e6537e9dd.jpg)
:::

![figure1](https://osp.computing.ncku.edu.tw:3001/uploads/upload_7f1a23792269450df70b1d6f35672eb5.jpg)

example: [config.json](https://osp.computing.ncku.edu.tw:4001/snippets/1)

### Address Space Configuration Format

#### System Componenet Definition
There are 5 types of components
- BUS
- CPU  (Master)
- Memory (Slave)
- Busbridge (Master, Slave)
- Device (Master, Slave)

#### Json-Component - CPU

|      Field Name      | Description                      |
|:--------------------:|:-------------------------------- |
|        type        | CPU |
|        name         | name   |
| bus | which bus to connect        |

example: 
```json==
{
  type: "cpu",
  name: "top-cpu",
  bus: "top-level-bus"
}
```

#### Json-Component - bus
| Field Name | Description |
|:----------:|:-----------:|
|    type    |     bus     |
|    name    |    name     |
|   Slave    | Slave Port  |
|   Master   | Master Port |

- example

```json==
  {
    type: 'bus',
    name: "top-level-bus",

    master: 
    {
        "top-cpu",
        "bb-subsystem1-top"
    },
    slave:{
        "top-ddr",
        "bb-top-subsystem1"
    }

  }
  ```

#### Json-Component - Device
| Field Name | Description |
|:----------:|:----------- |
|    type    | device      |
|    name    | Device name |
|   Master   | Master Port |
|   Slave    | Slave Port  |


exampe: 
- TDLA
  ```json== 
  {
    type: 'device',
    name: 'TDLA-SubSystem1',
    master: "subsystem-bus-1",
    slave: {
      {
        "name": "TDLA-register-port",
        "start": ???,
        "end": ???
      },
      {
        "name": "TDLA-buffer-port",
        "start": ???,
        "end": ???
      }
    }
  }
  ```
#### Json-Component - Busbridge
| Field Name | Description |
|:----------:|:-----------:|
|    type    |   busbridge |
|    name    | name |
|   Master   | Master Port |
|   Slave    | Slave Port  |

exampe: 
- TDLA
  ```json== 
  {
    type: 'busbridge',
    name: 'TBB-Top-SubSystem1',
    master: {
      {
        "name": "TBB-Top-Master",
        "AddressSpace" : "Top-Address-Space"
      },
      {
        "name": "TBB-Sub1-Master",
        "AddressSpace" : "Sub1-Address-Space"
      }
    },
    slave: {
      {
        "name": "TBB-Sub1-Slave",
        "start": 0xC0000000,
        "end": 0xD00000000
      },
      {
        "name": "TDLA-Top-Slave",
        "start": 0x80000000,
        "end": 0xFFFFFFFF
      }
    }
  }
  ```

#### Json-Component - Memory
| Field Name | Description |
|:----------:|:-----------:|
|    type    |   memory |
|    name    | name |
|   Slave    | Slave Port  |

- example

```json==
  {
    type: 'memory',
    name: "top-DDR",
    address_region: 
    {
        start: 0x00000000,
        end: 0x7FFFFFFF,
    }

  }
  ```

- T2S1BUFB
  ```json==
  {
    kind: 'buffer',
    name: 'T2S1BUFB',
    scopes: [
      {
        start: 0x10100000,
        end: 0x101FFFFF,
        offset: null
      }
    ]
  }

  ```
- T2S1DDR
  ```json==
  {
    kind: 'buffer',
    name: 'T2S1DDR',
    scopes: [
      {
        start: 0x40000000,
        end: null,
        offset: 0x20000000
      }
    ]
  }
  ```
- S1CPU
  ```json==
  {
    kind: 'device',
    name: 'S1CPU',
    scopes: [
      {
        start: 0x0,
        end: 0xFFFFFFFF
      }
    ]
  }
  ```
- Engine1A
  ```json==
  {
    kind:'device',
    name: 'Engin1A',
    scopes: [
      {
        start: 0x0 
        end: 0x00200000
      },
      {
        start: 0xC0000000,
        end: 0xFFFFFFFF
      }
    ]
  }
  ```
- Engine1B
  ```json==
  {
    kind:'device',
    name: 'Engin1B',
    scopes: [
      {
        start: 0x0, 
        end: 0x00200000
      }
    ]
  }
  ```
- S1DDR
  ```json==
  {
    kind:'buffer',
    name: 'S1DDR',
    scopes: [
      {
        start: 0xC0000000
        end: 0xFFFFFFFF
      }
    ]
  }
  ```
- S1BUFA
  ```json==
  {
    kind:'buffer',
    name: 'S1BUFA',
    scopes: [
      {
        start: 0x0, 
        end: 0x000FFFFF
      }
    ]
  }
  ```
- S1BUFB
  ```json==
  {
    kind:'buffer',
    name: 'S1BUFB',
    scopes: [
      {
        start: 0x00100000,
        end: 0x001FFFFF
      }
    ]
  }
  ```
- S1ENA
  ```json==
  {
    kind:'buffer',
    name: 'S1ENA',
    scopes: [
      {
        start: 0x00A00000,
        end: 0x00A03FFF
      }
    ]
  }
  ```
- S1ENB
  ```json==
  {
    kind:'buffer',
    name: 'S1ENB',
    scopes: [
      {
        start: 0x00A04000,
        end: 0x00A07FFF
      }
    ]
  }
  ```
- T2S2BUFA
  ```json==
  {
    kind: 'buffer',
    name: 'T2S1BUFA',
    scopes: [
      {
        start: 0x20000000,
        end: 0x200FFFFF,
        offset: null
      }
    ]
  }
  ```
- T2S2BUFB
  ```json==
  {
    kind: 'buffer',
    name: 'T2S1BUFB',
    scopes: [
      {
        start: 0x20100000,
        end: 0x201FFFFF,
        offset: null
      }
    ]
  }

  ```
- T2S2DDR
  ```json==
  {
    kind: 'buffer',
    name: 'T2S1DDR',
    scopes: [
      {
        start: 0x5FFFFFFF,
        end: null,
        offset: 0x20000000
      }
    ]
  }
  ```
- S2CPU
  ```json==
  {
    kind: 'device',
    name: 'S2CPU',
    scopes: [
      {
        start: 0x0,
        end: 0xFFFFFFFF
      }
    ]
  }
  ```
- Engine2A
  ```json==
  {
    kind:'device',
    name: 'Engin2A',
    scopes: [
      {
        start: 0x0 
        end: 0x00200000
      },
      {
        start: 0xC0000000,
        end: 0xFFFFFFFF
      }
    ]
  }
  ```
- Engine2B
  ```json==
  {
    kind:'device',
    name: 'Engin2B',
    scopes: [
      {
        start: 0x0, 
        end: 0x00200000
      }
    ]
  }
  ```
- S2DDR
  ```json==
  {
    kind:'buffer',
    name: 'S2DDR',
    scopes: [
      {
        start: 0xC0000000
        end: 0xFFFFFFFF
      }
    ]
  }
  ```
- S2BUFA
  ```json==
  {
    kind:'buffer',
    name: 'S2BUFA',
    scopes: [
      {
        start: 0x0, 
        end: 0x000FFFFF
      }
    ]
  }
  ```
- S2BUFB
  ```json==
  {
    kind:'buffer',
    name: 'S2BUFB',
    scopes: [
      {
        start: 0x00100000,
        end: 0x001FFFFF
      }
    ]
  }
  ```
- S2ENA
  ```json==
  {
    kind:'buffer',
    name: 'S2ENA',
    scopes: [
      {
        start: 0x00A00000,
        end: 0x00A03FFF
      }
    ]
  }
  ```
- S2ENB
  ```json==
  {
    kind:'buffer',
    name: 'S2ENB',
    scopes: [
      {
        start: 0x00A04000,
        end: 0x00A07FFF
      }
    ]
  }
  ```
#### Bridge
Field Name|Description
:--------:|:-------------------
name|Bridge name
master|Arrays of master device
slave|Arrays of slave device
example: 
- T2S1 Bridge
  ```json==
  {
    name: 'T2S1',
    master: [
      T2S1BUFA, T2S1BUFB, T2S1DDR
    ],
    slave: [
      S1BUFA, S1BUFA, S1DDR
    ]
  }
  ```
- T2S2 Bridge
  ```json==
  {
    name: 'T2S2',
    master: [
      T2S2BUFA, T2S2BUFB, T2S2DDR
    ],
    slave: [
      S2BUFA, S2BUFA, S2DDR
    ]
  }
  ```  

#### BUS
Field Name|Description
:--------:|:-------------------
name|BUS name
master|Arrays of master device
slave|Arrays of slave device
example:
- Top BUS
  ```json==
  {
    name: 'TopBUS',
    master: [TCPU],
    slave: [TDDR, T2S1.master, T2S2.master]
  }
  ```
- S1BUS
  ```json==
  {
    name: 'S1BUS',
    master: [T2S1.slave, S1CPU, Engine1A, Engin1B],
    slave: [S1BUFA, S1BUFB, S1ENA, S1ENB, S1DDR]
  }
  ```
- S2BUS
  ```json==
  {
    name: 'S2BUS',
    master: [T2S2.slave, S2CPU, Engine2A, Engin2B],
    slave: [S2BUFA, S2BUFB, S2ENA, S2ENB, S2DDR]
  }
  ```

### 2. Design API for paring address space configuration file

* Data structures
    * Bus information
        * `uint32_t id`: bus ID
        * `char *name`: bus name 
    ```cpp=
    struct bus_info
    {
        uint32_t id;
        char *name;
    }
    ```
    * Slave device (memory region) information
        * `uint32_t id`: slave device ID
        * `char *name`: slave device name
        * `uint64_t size`: slave device (memory region) size
        * `uint32_t owner_id` (Need to check)
            * Describe who should provide access interface for this slave device
    ```cpp=
    struct slave_device_info
    {
        uint32_t id;
        char *name;
        uint64_t size;
        uint32_t owner_id;
    }
    ```
    * Bus & slave device mapping information
        * `uint32_t slave_id`: slave ID of this mapping
        * `uint64_t start_addr`: start address of this mapping
        * `uint64_t size`: size of this slave device address mapping (end address = start address + size)
        * `uint64_t slave_offset`: if mapping part of slave device, we need the offset information
    ```cpp=
    struct bus_slave_mapping
    {
        uint32_t slave_id;
        uint64_t start_addr;
        uint64_t size;
        uint64_t slave_offset;
    }
    ```

* Functions
    * Parsing address space view configuration file
        * `char *filepath`: the path of configuration file
    ```cpp=
    void parsing_bus_config_file(char *filepath);
    // this function will fill out the following data structures
    //int _num_bus;
    //struct bus_info _bus_table[]; //This array should have _num_bus elements 
    ```
    * Get all bus information
        * `uint32_t *num_bus`: store total bus number in `num_bus`
        * `struct bus_info *bus_table`: store all bus information in `bus_table`
    ```cpp=
    
    //Assuming after parsing, you have the following data
    //int _num_bus;
    //struct bus_info _bus_table[]; //This array should have _num_bus elements    
    void get_all_bus_info(uint32_t *num_bus, struct bus_info *bus_table){
        *num_bus = _num_bus;
        *bus_table = _bus_table;
    }
    ```
    * Get all slave deivce information
        * `uint32_t *num_slave_dev`: store total slave device number in `num_slave_dev`
        * `struct slave_device_info *slave_dev_table`: store all slave device information in `slave_dev_table`
    ```cpp=
    void get_all_slave_device_info(uint32_t *num_slave_dev, struct slave_device_info *slave_dev_table);
    ```
    * Get all bus & slave mapping information
        * `uint32_t bus_id`: bus ID for searching matched mapping elements
        * `uint32_t *num_mapping`: store matched mapping number in `num_mapping`
        * `struct bus_slave_mapping *mapping_table`: store all matched mapping elements in `mapping_table`
    ```cpp=
    void get_bus_slave_mapping_info(uint32_t bus_id, uint32_t *num_mapping, struct bus_slave_mapping *mapping_table)
    ```
    
### 3. Implement the configuration file parser
see another [note](https://osp.computing.ncku.edu.tw:3001/W-gn_TFxSoWsPcDCyWCfvA)

## What I would need in order to use your framework

- In order to write firmware running on any CPU
    - I need to know what address space regions I can access
- In order to model a device that can access a paraticular set of address space regions
    - A device modeler need a read/write interface to visible memory-mapped regions. 
        - The system provider will have a mapping table between the issued address and the physical address offset of the target device for the device modeler. 
        - Step 1. The system provider will Write a configuration file based on a predfined  mapping table.
        - Step 2. Once the system is built and ready for development, the device modeler need to access the memory-mapped region via the following APIs in the framework.
            - char *readMemory(uint32_t addr, int size); 
            - void writeMomory(uint32_t addr, int size, char *data);
    
     | target  | Request address region(addr) | device address region   |
     | ------- | ---------------------- | ----------------------- |
     | Top DDR | 0x0-0x80000000         | 0x100000000-0x180000000 |
     | Local DDR | 0x80000000-0xBFFFFFFF| 0x0-0x3FFFFFFFF|

## Questions
> [name=Gimme]
1. DDR(TDDR, S1DDR, S2DDR), Buffer(S1bufA, S1bufB, S2BufA, S2BufB) 應該是受控器(Slave)端？箭頭畫反了？
    > Updated [name=max]
> [name=YuTing]
3. [上面那張圖](#ToDo) 的 buf 和 engine 是什麼意思？
    > buffer 是屬於 memory region 一種，engine 是一種 hw device ，預計 Gimme 的 configuration rule spec 會定義這兩種 componenment 的相關語法。[name=max]
    >> 我目前把兩個都定義成Device唷[name=gimme]
5. C 語言有指定要用哪個標準嗎？C89/C99/C11/C17
    > follow QEMU : C99 [name=max]
7. `parsing_bus_config_file` 的參數要用 `filename` 還是 `filepath`？
    > `filepath`，敘述 typo [name=max]
9. 能不能不要用 master/slave，改用其他 [替代名稱](https://en.wikipedia.org/wiki/Master/slave_(technology))
    > 我目前沒有看到好得相對應 term ，可以開會時看有沒有人推薦適合的 term [name=max]
11. `owner_id` needs to check
    > 這部分還需要討論確認需求。 [name=max]
13. 需要有 configuration file format
    > 呼叫 Gimme [name=max]
    >> 我預計使用YML format [name=gimme] 
15. 不太清楚 functions 間的關係和處理流程，能不能給個 usage example
    > ToDo [name=max]
    > 

## ToDo List

