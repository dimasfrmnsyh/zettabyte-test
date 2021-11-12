const {
    Article,
    Comment
} = require('../models')

exports.getAll = async (req, res) => {
    try {
        let {
			page,
			pageSize,
			sort,
		} = req.query
        pageSize = Number(pageSize)
        console.log(req.query);
        const data = await Article.aggregate([
            {
                $lookup:
                {
                    from: "comments",
                    localField: "listComment",
                    foreignField: "_id",
                    as: "commentObj"
               },
             },
             {
                $unwind: "$commentObj"
              },
           
            {
                $project: {
                    articleName: '$name',
                    commen: '$commentObj.isiComment',
                },
            },
            { $sort: { sort: 1 } },
			{ $skip: pageSize * page },
			{ $limit: pageSize },
        ])
        const total = await Article.aggregate([
			{ $group: { _id: null, count: { $sum: 1 } } },
			{ $project: { _id: 0 } },
		])

		const totalCount = total.length > 0 ? total[0].count : 0

        const dataList = {
			data: data,
			page,
			pageSize,
			totalPage: Math.ceil(totalCount / pageSize),
			totalData: totalCount,
		}
        return res.status(200).json({ message: 'success', dataList })
    }
    catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

exports.getAllUsingFind = async(req,res)=> {
    try {
        const {page,sorted,pageSize} = req.query
        let dataList = []
		let totalCount = 0
        if (page) {
        dataList = await Article.find().populate('listComment')
        .limit(pageSize)
        .skip(pageSize * page)
        .sort(sorted)
        totalCount = await Article.countDocuments()
    }	else {
        dataList = await Article.find().sort(sorted)
    }
    const data = {
        data: dataList,
        page,
        pageSize: page ? pageSize : undefined,
        totalPage: page ? Math.ceil(totalCount / pageSize) : undefined,
        totalData: page ? totalCount : dataList.length,
    }
        return res.status(200).json({ message: 'success', data})
    }
    catch (err) {
        return res.status(400).json({ message: err.message })
    }
}
exports.getOne = async (req, res) => {
    try {
        const { id } = req.params
        let data = await Article.findOne({ _id: id }).populate('comment')
        return res.status(200).json({ message: 'success', data })
    }
    catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

exports.create = async (req, res) => {
    try {
        const name = req.body
        let article = new Article(name)
        await article.save()
        return res.status(200).json({ message: 'success', article })
    }
    catch (err) {
        return res.status(400).json({ message: err.message })
    }
}

exports.update = async (req, res) => {
    try {
        const { id } = req.params
        let data = await Article.findOne({ _id: id })
        let form = {
            ...data._doc,
            ...req.body
        }
        dataUpdated = await Object.assign(data, form).save()
        return res.status(200).json({ message: 'success', dataUpdated })
    }
    catch (err) {
        return res.status(400).json({ message: err.message })
    }
    
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params
        let data = await Article.findOne({ _id: id })
        data.remove();
        return res.status(200).json({ message: 'success deleting data' })
    }
    catch (err) {
        return res.status(400).json({ message: err.message })
    }
}